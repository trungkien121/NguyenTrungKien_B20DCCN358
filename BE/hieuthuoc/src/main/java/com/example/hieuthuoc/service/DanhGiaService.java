package com.example.hieuthuoc.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.example.hieuthuoc.dto.DanhGiaDTO;
import com.example.hieuthuoc.dto.PageDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.dto.SearchDTO;
import com.example.hieuthuoc.entity.DanhGia;
import com.example.hieuthuoc.entity.NguoiDung;
import com.example.hieuthuoc.entity.Thuoc;
import com.example.hieuthuoc.repository.DanhGiaRepo;
import com.example.hieuthuoc.repository.NguoiDungRepo;
import com.example.hieuthuoc.repository.ThuocRepo;

public interface DanhGiaService {
	ResponseDTO<PageDTO<List<DanhGia>>> getAll(SearchDTO searchDTO);

	ResponseDTO<DanhGia> create(DanhGiaDTO danhGiaDTO);

	ResponseDTO<DanhGia> update(DanhGiaDTO danhGiaDTO);

	ResponseDTO<Void> delete(Integer id);
}

@Service
class DanhGiaServiceImpl implements DanhGiaService {

	@Autowired
	private DanhGiaRepo danhGiaRepo;
	
	@Autowired
	private ThuocRepo thuocRepo;
	
	@Autowired
	private NguoiDungRepo nguoiDungRepo;
	

	ModelMapper modelMapper = new ModelMapper();

	@Override
	public ResponseDTO<PageDTO<List<DanhGia>>> getAll(SearchDTO searchDTO) {
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

		if (searchDTO.getKeyWord() == null) {
			searchDTO.setKeyWord("");
		}

		PageRequest pageRequest = PageRequest.of(searchDTO.getCurrentPage(), searchDTO.getSize(), sortBy);
		Page<DanhGia> page = danhGiaRepo.findByThuocId(searchDTO.getId(), pageRequest);

		PageDTO<List<DanhGia>> pageDTO = new PageDTO<>();
		pageDTO.setTotalElements(page.getTotalElements());
		pageDTO.setTotalPages(page.getTotalPages());

		List<DanhGia> danhGiaDTOs = page.getContent();

		pageDTO.setData(danhGiaDTOs);

		return ResponseDTO.<PageDTO<List<DanhGia>>>builder().status(200).msg("Thanh công").data(pageDTO).build();
	}

	@Override
	@Transactional
	public ResponseDTO<DanhGia> create(DanhGiaDTO danhGiaDTO) {
		DanhGia danhGia = modelMapper.map(danhGiaDTO, DanhGia.class);
		
		Thuoc thuoc = thuocRepo.findById(danhGiaDTO.getThuocId())
				.orElseThrow(() -> new RuntimeException("Thuốc không tồn tại"));
		
		NguoiDung nguoiDung = nguoiDungRepo.findById(danhGiaDTO.getNguoiDungId())
				.orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));
		
		
		if(danhGiaDTO.getDanhGiaGocId() != null) {
			DanhGia danhGiaGoc = danhGiaRepo.findById(danhGiaDTO.getDanhGiaGocId())
					.orElseThrow(() -> new RuntimeException("Đánh giá không tồn tại"));
			danhGia.setDanhGiaGoc(danhGiaGoc);
		}
		
		danhGia.setThuoc(thuoc);
		danhGia.setNguoiDung(nguoiDung);

		return ResponseDTO.<DanhGia>builder().status(200).msg("Thanh công").data(danhGiaRepo.save(danhGia)).build();
	}

	@Override
	@Transactional
	public ResponseDTO<DanhGia> update(DanhGiaDTO danhGiaDTO) {
		DanhGia danhGia = danhGiaRepo.findById(danhGiaDTO.getId()).orElse(null);
		if (danhGia != null) {
			
			danhGia.setDanhGia(danhGiaDTO.getDanhGia());
			danhGia.setDiemSo(danhGiaDTO.getDiemSo());
			
			return ResponseDTO.<DanhGia>builder().status(200).msg("Thanh công").data(danhGiaRepo.save(danhGia)).build();
		}
		return ResponseDTO.<DanhGia>builder().status(409).msg("Không tồn tại đánh giá").build();
	}

	@Override
	@Transactional
	public ResponseDTO<Void> delete(Integer id) {
		danhGiaRepo.deleteById(id);
		return ResponseDTO.<Void>builder().status(200).msg("Thanh công").build();
	}
}
