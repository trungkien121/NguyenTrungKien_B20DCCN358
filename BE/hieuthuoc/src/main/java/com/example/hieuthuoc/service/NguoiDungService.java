package com.example.hieuthuoc.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.example.hieuthuoc.dto.NguoiDungDTO;
import com.example.hieuthuoc.dto.PageDTO;
import com.example.hieuthuoc.dto.SearchDTO;
import com.example.hieuthuoc.entity.ChucNang;
import com.example.hieuthuoc.entity.NguoiDung;
import com.example.hieuthuoc.entity.NhomQuyen;
import com.example.hieuthuoc.repository.NguoiDungRepo;

public interface NguoiDungService {
	PageDTO<List<NguoiDungDTO>> getNguoiDungByName(SearchDTO searchDTO);

	NguoiDungDTO getNguoiDungById(Integer id);

	NguoiDungDTO getNguoiDungByTenDangNhap(String tenDangNhap);

	NguoiDung save(NguoiDungDTO nguoiDungDTO);

	NguoiDung update(NguoiDungDTO nguoiDungDTO);

	void delete(Integer id);
}

@Service
class NguoiDungServiceImpl implements NguoiDungService, UserDetailsService {

	@Autowired
	private NguoiDungRepo nguoiDungRepo;

	ModelMapper modelMapper = new ModelMapper();

	@Override
	public PageDTO<List<NguoiDungDTO>> getNguoiDungByName(SearchDTO searchDTO) {

		Sort sortBy = Sort.by("hoTen").ascending();

		if (StringUtils.hasText(searchDTO.getSortedField())) {
			sortBy = Sort.by(searchDTO.getSortedField()).ascending();
		}

		if (searchDTO.getCurrentPage() == null) {
			searchDTO.setCurrentPage(0);
		}

		if (searchDTO.getSize() == null) {
			searchDTO.setSize(20);
		}
		PageRequest pageRequest = PageRequest.of(searchDTO.getCurrentPage(), searchDTO.getSize(), sortBy);
		Page<NguoiDung> page = nguoiDungRepo.searchByName("%" + searchDTO.getKeyWord() + "%", pageRequest);

		PageDTO<List<NguoiDungDTO>> pageDTO = new PageDTO<>();
		pageDTO.setTotalElements(page.getTotalElements());
		pageDTO.setTotalPages(page.getTotalPages());

		List<NguoiDungDTO> nguoidungs = page.get().map(nguoidung -> modelMapper.map(nguoidung, NguoiDungDTO.class))
				.collect(Collectors.toList());

		pageDTO.setData(nguoidungs);

		return pageDTO;
	}

	@Override
	public NguoiDungDTO getNguoiDungById(Integer id) {
		NguoiDung nguoiDung = nguoiDungRepo.findById(id).orElse(null);
		if (nguoiDung != null) {
			return modelMapper.map(nguoiDung, NguoiDungDTO.class);
		}

		return null;
	}

	@Override
	@Transactional
	public NguoiDung save(NguoiDungDTO nguoiDungDTO) {
		NguoiDung nguoiDung = modelMapper.map(nguoiDungDTO, NguoiDung.class);
		nguoiDung.setMatKhau(new BCryptPasswordEncoder().encode(nguoiDung.getMatKhau()));
		return nguoiDungRepo.save(nguoiDung);
	}

	@Override
	@Transactional
	public NguoiDung update(NguoiDungDTO nguoiDungDTO) {
		NguoiDung nguoiDung = modelMapper.map(nguoiDungDTO, NguoiDung.class);
		NguoiDung currentNguoiDung = nguoiDungRepo.findById(nguoiDung.getId()).orElse(null);
		if (currentNguoiDung != null) {
			return nguoiDungRepo.save(nguoiDung);
		}
		return null;
	}

	@Override
	@Transactional
	public void delete(Integer id) {
		nguoiDungRepo.deleteById(id);
	}

	@Override
	public UserDetails loadUserByUsername(String tenDangNhap) throws UsernameNotFoundException {
		NguoiDung nguoiDung = nguoiDungRepo.findByTenDangNhap(tenDangNhap);

		if (nguoiDung == null) {
			throw new UsernameNotFoundException("Not Found User");
		}

		Set<GrantedAuthority> authorities = new HashSet<>();
		for (NhomQuyen nhomQuyen : nguoiDung.getNhomQuyens()) {
			authorities.add(new SimpleGrantedAuthority(nhomQuyen.getTenNhomQuyen()));
			for (ChucNang chucNang : nhomQuyen.getChucNangs()) {
				authorities.add(new SimpleGrantedAuthority(chucNang.getTenChucNang()));
			}
		}

		return new org.springframework.security.core.userdetails.User(nguoiDung.getTenDangNhap(),
				nguoiDung.getMatKhau(), authorities);
	}

	@Override
	public NguoiDungDTO getNguoiDungByTenDangNhap(String tenDangNhap) {
		NguoiDung nguoiDung = nguoiDungRepo.findByTenDangNhap(tenDangNhap);
		return modelMapper.map(nguoiDung, NguoiDungDTO.class);
	}
}
