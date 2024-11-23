package com.example.hieuthuoc.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.example.hieuthuoc.dto.DonHangDTO;
import com.example.hieuthuoc.dto.PageDTO;
import com.example.hieuthuoc.dto.SearchDTO;
import com.example.hieuthuoc.entity.ChiTietDonHang;
import com.example.hieuthuoc.entity.DonHang;
import com.example.hieuthuoc.entity.Thuoc;
import com.example.hieuthuoc.repository.DonHangRepo;
import com.example.hieuthuoc.repository.ThuocRepo;

public interface DonHangService {
	PageDTO<List<DonHangDTO>> getByTrangThaiGiaoHang(SearchDTO searchDTO);

	Optional<DonHangDTO> getById(Integer id);

	DonHang create(DonHangDTO donHangDTO);

	DonHang update(DonHangDTO donHangDTO);

	void delete(Integer id);
}

@Service
class DonHangServiceImpl implements DonHangService {

	@Autowired
	private DonHangRepo donHangRepo;

	@Autowired
	private ThuocRepo thuocRepo;

	ModelMapper modelMapper = new ModelMapper();

	@Override
	public PageDTO<List<DonHangDTO>> getByTrangThaiGiaoHang(SearchDTO searchDTO) {
		Sort sortBy = Sort.by("id").ascending();

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
		Page<DonHang> page;

		if (searchDTO.getKeyWord() == null) {
			page = donHangRepo.findAll(pageRequest);
		}

		page = donHangRepo.findByTrangThaiGiaoHang("%" + searchDTO.getKeyWord() + "%", pageRequest);

		PageDTO<List<DonHangDTO>> pageDTO = new PageDTO<>();
		pageDTO.setTotalElements(page.getTotalElements());
		pageDTO.setTotalPages(page.getTotalPages());

		List<DonHangDTO> donHangDTOs = page.get().map(donghang -> modelMapper.map(donghang, DonHangDTO.class))
				.collect(Collectors.toList());

		pageDTO.setData(donHangDTOs);

		return pageDTO;
	}

	@Override
	public Optional<DonHangDTO> getById(Integer id) {
		Optional<DonHang> donhang = donHangRepo.findById(id);
		if (donhang.isPresent()) {
			DonHangDTO donHangDTO = modelMapper.map(donhang.get(), DonHangDTO.class);
			return Optional.of(donHangDTO);
		}
		return Optional.empty();
	}

	@Override
	@Transactional
	public DonHang create(DonHangDTO donHangDTO) {
		DonHang donHang = modelMapper.map(donHangDTO, DonHang.class);
		
		

		List<ChiTietDonHang> chiTietDonHangs = new ArrayList<>();
		for (ChiTietDonHang chiTietDonHang : donHang.getChiTietDonHangs()) {

			Thuoc thuoc = thuocRepo.findById(chiTietDonHang.getThuoc().getId())
					.orElseThrow(() -> new RuntimeException("Thuốc không tồn tại"));

			chiTietDonHang.setThuoc(thuoc);
			chiTietDonHang.setDonHang(donHang);
			chiTietDonHangs.add(chiTietDonHang);

		}

		donHang.setChiTietDonHangs(chiTietDonHangs);
		return donHangRepo.save(donHang);
	}

	@Override
	@Transactional
	public DonHang update(DonHangDTO donHangDTO) {
		DonHang donHang = modelMapper.map(donHangDTO, DonHang.class);
		DonHang currentDonHang = donHangRepo.findById(donHang.getId()).orElse(null);
		if (currentDonHang != null) {

			List<ChiTietDonHang> chiTietDonHangs = new ArrayList<>();
			for (ChiTietDonHang chiTietDonHang : donHang.getChiTietDonHangs()) {

				Thuoc thuoc = thuocRepo.findById(chiTietDonHang.getThuoc().getId())
						.orElseThrow(() -> new RuntimeException("Thuốc không tồn tại"));

				chiTietDonHang.setThuoc(thuoc);
				chiTietDonHang.setDonHang(donHang);
				chiTietDonHangs.add(chiTietDonHang);

			}

			donHang.setChiTietDonHangs(chiTietDonHangs);

			return donHangRepo.save(donHang);
		}
		return null;
	}

	@Override
	@Transactional
	public void delete(Integer id) {
		donHangRepo.deleteById(id);
	}
}
