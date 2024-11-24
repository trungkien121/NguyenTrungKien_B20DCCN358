package com.example.hieuthuoc.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.apache.commons.lang3.RandomStringUtils;
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
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.dto.SearchDTO;
import com.example.hieuthuoc.entity.ChucNang;
import com.example.hieuthuoc.entity.NguoiDung;
import com.example.hieuthuoc.entity.NhomQuyen;
import com.example.hieuthuoc.repository.NguoiDungRepo;
import com.example.hieuthuoc.repository.NhomQuyenRepo;

public interface NguoiDungService {

	ResponseDTO<NguoiDung> create(NguoiDungDTO nguoiDungDTO);

	ResponseDTO<NguoiDung> update(NguoiDungDTO nguoiDungDTO);

	ResponseDTO<Void> delete(Integer id);

	ResponseDTO<NguoiDung> register(NguoiDungDTO nguoiDungDTO);

	ResponseDTO<NguoiDung> getById(Integer id);

	NguoiDungDTO getByTenDangNhap(String tenDangNhap);

	ResponseDTO<PageDTO<List<NguoiDungDTO>>> getByHoTen(SearchDTO searchDTO);

	ResponseDTO<NguoiDung> changeMatKhau(NguoiDungDTO nguoiDungDTO);

	ResponseDTO<NguoiDung> forgotMatKhau(String email);

	ResponseDTO<NguoiDung> changeAvatar(NguoiDungDTO nguoiDungDTO);

	void sendEmailForgotMatKhau(String email, String password);
}

@Service
class NguoiDungServiceImpl implements NguoiDungService, UserDetailsService {

	@Autowired
	NguoiDungRepo nguoiDungRepo;

	@Autowired
	NhomQuyenRepo nhomQuyenRepo;

	@Autowired
	EmailService emailService;

	ModelMapper modelMapper = new ModelMapper();

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
	@Transactional
	public ResponseDTO<NguoiDung> create(NguoiDungDTO nguoiDungDTO) {
		NguoiDung nguoiDung = modelMapper.map(nguoiDungDTO, NguoiDung.class);

		if (nguoiDungRepo.findByTenDangNhap(nguoiDung.getTenDangNhap()) != null) {
			return ResponseDTO.<NguoiDung>builder().status(400).msg("Tên đăng nhập đã tồn tại.").build();
		}

		if (nguoiDungRepo.findByEmail(nguoiDung.getEmail()) != null) {
			return ResponseDTO.<NguoiDung>builder().status(400).msg("Email đã tồn tại.").build();
		}

		nguoiDung.setMatKhau(new BCryptPasswordEncoder().encode(nguoiDung.getMatKhau()));

		List<NhomQuyen> nhomQuyens = new ArrayList<>();
		for (NhomQuyen nhomQuyen : nguoiDung.getNhomQuyens()) {
			nhomQuyens.add(nhomQuyenRepo.findById(nhomQuyen.getId()).get());
		}
		nguoiDung.setNhomQuyens(nhomQuyens);

		nguoiDungRepo.save(nguoiDung);

		return ResponseDTO.<NguoiDung>builder().status(200).msg("Thành công").data(nguoiDung).build();
	}

	@Override
	@Transactional
	public ResponseDTO<NguoiDung> update(NguoiDungDTO nguoiDungDTO) {
		NguoiDung nguoiDung = modelMapper.map(nguoiDungDTO, NguoiDung.class);
		NguoiDung currentNguoiDung = nguoiDungRepo.findById(nguoiDung.getId()).orElse(null);
		if (currentNguoiDung != null) {
			return ResponseDTO.<NguoiDung>builder().status(200).msg("Thành công").data(nguoiDungRepo.save(nguoiDung))
					.build();
		}
		return ResponseDTO.<NguoiDung>builder().status(400).msg("Tài khoản không tồn tại.").build();
	}

	@Override
	@Transactional
	public ResponseDTO<Void> delete(Integer id) {
		nguoiDungRepo.deleteById(id);
		return ResponseDTO.<Void>builder().status(200).msg("Thành công.").build();
	}

	@Override
	@Transactional
	public ResponseDTO<NguoiDung> register(NguoiDungDTO nguoiDungDTO) {
		NguoiDung nguoiDung = modelMapper.map(nguoiDungDTO, NguoiDung.class);

		if (nguoiDungRepo.findByTenDangNhap(nguoiDung.getTenDangNhap()) != null) {
			return ResponseDTO.<NguoiDung>builder().status(400).msg("Tên đăng nhập đã tồn tại.").build();
		}

		if (nguoiDungRepo.findByEmail(nguoiDung.getEmail()) != null) {
			return ResponseDTO.<NguoiDung>builder().status(400).msg("Email đã tồn tại.").build();
		}

		nguoiDung.setMatKhau(new BCryptPasswordEncoder().encode(nguoiDung.getMatKhau()));

		List<NhomQuyen> nhomQuyens = new ArrayList<>();
		nhomQuyens.add(nhomQuyenRepo.findByTenNhomQuyen("KHACH_HANG"));

		nguoiDung.setNhomQuyens(nhomQuyens);
		nguoiDungRepo.save(nguoiDung);

		return ResponseDTO.<NguoiDung>builder().status(200).msg("Đăng ký thành công.").data(nguoiDung).build();
	}

	@Override
	public ResponseDTO<NguoiDung> getById(Integer id) {
		NguoiDung nguoiDung = nguoiDungRepo.findById(id).orElse(null);
		if (nguoiDung != null) {
			return ResponseDTO.<NguoiDung>builder().status(200).msg("Thành công").data(nguoiDung).build();
		}

		return ResponseDTO.<NguoiDung>builder().status(400).msg("Tài khoản không tồn tại.").build();
	}

	@Override
	public NguoiDungDTO getByTenDangNhap(String tenDangNhap) {
		NguoiDung nguoiDung = nguoiDungRepo.findByTenDangNhap(tenDangNhap);
		return modelMapper.map(nguoiDung, NguoiDungDTO.class);
	}

	@Override
	public ResponseDTO<PageDTO<List<NguoiDungDTO>>> getByHoTen(SearchDTO searchDTO) {

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

		if (searchDTO.getKeyWord() == null) {
			searchDTO.setKeyWord("");
		}
		PageRequest pageRequest = PageRequest.of(searchDTO.getCurrentPage(), searchDTO.getSize(), sortBy);
		Page<NguoiDung> page = nguoiDungRepo.searchByName("%" + searchDTO.getKeyWord() + "%", pageRequest);

		PageDTO<List<NguoiDungDTO>> pageDTO = new PageDTO<>();
		pageDTO.setTotalElements(page.getTotalElements());
		pageDTO.setTotalPages(page.getTotalPages());
		pageDTO.setCurrentPage(page.getNumber());

		List<NguoiDungDTO> nguoiDungDTOs = page.get().map(nguoidung -> modelMapper.map(nguoidung, NguoiDungDTO.class))
				.collect(Collectors.toList());

		pageDTO.setData(nguoiDungDTOs);

		return ResponseDTO.<PageDTO<List<NguoiDungDTO>>>builder().status(200).msg("Thành công").data(pageDTO).build();
	}

	@Override
	@Transactional
	public ResponseDTO<NguoiDung> changeMatKhau(NguoiDungDTO nguoiDungDTO) {
		NguoiDung nguoiDung = modelMapper.map(nguoiDungDTO, NguoiDung.class);
		NguoiDung currentNguoiDung = nguoiDungRepo.findById(nguoiDung.getId()).orElse(null);
		if (currentNguoiDung != null) {
			currentNguoiDung.setMatKhau(new BCryptPasswordEncoder().encode(nguoiDung.getMatKhau()));
			return ResponseDTO.<NguoiDung>builder().status(200).msg("Thành công").data(currentNguoiDung).build();
		}
		return ResponseDTO.<NguoiDung>builder().status(400).msg("Tài khoản không tồn tại.").build();
	}

	@Override
	@Transactional
	public ResponseDTO<NguoiDung> forgotMatKhau(String email) {

		try {
			NguoiDung nguoiDung = nguoiDungRepo.findByEmail(email);
			if (nguoiDung != null) {
				String matkhau = RandomStringUtils.random(10, true, true);
				nguoiDung.setMatKhau(new BCryptPasswordEncoder().encode(matkhau));
				nguoiDungRepo.save(nguoiDung);
				
				System.out.println("Mật Khẩu : " + matkhau);
				
				sendEmailForgotMatKhau(email, matkhau);
			}
		} catch (Exception e) {
			e.printStackTrace();
			ResponseDTO.<NguoiDung>builder().status(400).msg("Lỗi.").build();
		}
		return ResponseDTO.<NguoiDung>builder().status(200).msg("Thành công.").build();
	}

	@Override
	@Transactional
	public ResponseDTO<NguoiDung> changeAvatar(NguoiDungDTO nguoiDungDTO) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void sendEmailForgotMatKhau(String email, String matKhau) {
		String subject = "Reset mật khẩu";
		String body = "Mật khẩu tạm thời của bạn là: <strong>" + matKhau + "</strong>";
		body += "<br/> <span>Vui lòng đăng nhập và đổi lại mật khẩu của bạn</span>";

		try {
			emailService.sendEmail(email, subject, body);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

}
