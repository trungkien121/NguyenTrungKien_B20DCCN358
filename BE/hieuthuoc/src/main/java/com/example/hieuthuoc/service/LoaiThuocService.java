package com.example.hieuthuoc.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.hieuthuoc.dto.LoaiThuocDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.entity.LoaiThuoc;
import com.example.hieuthuoc.repository.LoaiThuocRepo;

public interface LoaiThuocService {
	ResponseDTO<List<LoaiThuoc>> getAllLoaiThuocs();

	ResponseDTO<LoaiThuoc> create(LoaiThuocDTO loaiThuocDTO);

	ResponseDTO<LoaiThuoc> update(LoaiThuocDTO loaiThuocDTO);

	ResponseDTO<Void> delete(Integer id);
}

@Service
class LoaiThuocServiceImpl implements LoaiThuocService {

	@Autowired
	private LoaiThuocRepo loaiThuocRepo;

	ModelMapper modelMapper = new ModelMapper();

	@Override
	public ResponseDTO<List<LoaiThuoc>> getAllLoaiThuocs() {
		return ResponseDTO.<List<LoaiThuoc>>builder().status(200).msg("Thành công").data(loaiThuocRepo.findAll())
				.build();
	}

	@Override
	@Transactional
	public ResponseDTO<LoaiThuoc> create(LoaiThuocDTO loaiThuocDTO) {
		LoaiThuoc loaiThuoc = modelMapper.map(loaiThuocDTO, LoaiThuoc.class);
		if (loaiThuocRepo.existsByTenLoai(loaiThuoc.getTenLoai())) {
			return ResponseDTO.<LoaiThuoc>builder().status(409).msg("Loại thuốc đã tồn tại").build();
		}	
		return ResponseDTO.<LoaiThuoc>builder().status(201).msg("Thành công").data(loaiThuocRepo.save(loaiThuoc))
				.build();
	}

	@Override
	@Transactional
	public ResponseDTO<LoaiThuoc> update(LoaiThuocDTO loaiThuocDTO) {
		LoaiThuoc loaiThuoc = modelMapper.map(loaiThuocDTO, LoaiThuoc.class);
		LoaiThuoc currentLoaiThuoc = loaiThuocRepo.findById(loaiThuoc.getId()).orElse(null);
		if (currentLoaiThuoc != null) {
			return ResponseDTO.<LoaiThuoc>builder().status(200).msg("Thành công").data(loaiThuocRepo.save(loaiThuoc))
					.build();
		}
		return ResponseDTO.<LoaiThuoc>builder().status(404).msg("Không tìm thấy loại thuốc").build();
	}

	@Override
	@Transactional
	public ResponseDTO<Void> delete(Integer id) {
		loaiThuocRepo.deleteById(id);
		return ResponseDTO.<Void>builder().status(200).msg("Thành công").build();
	}
}
