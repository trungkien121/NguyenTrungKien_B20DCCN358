package com.example.hieuthuoc.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.hieuthuoc.dto.DanhMucThuocDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.entity.DanhMucThuoc;
import com.example.hieuthuoc.repository.DanhMucThuocRepo;

public interface DanhMucThuocService {
	ResponseDTO<List<DanhMucThuoc>> getAll();

	ResponseDTO<DanhMucThuoc> create(DanhMucThuocDTO danhMucThuocDTO);

	ResponseDTO<DanhMucThuoc> update(DanhMucThuocDTO danhMucThuocDTO);

	ResponseDTO<Void> delete(Integer id);
}

@Service
class DanhMucThuocServiceImpl implements DanhMucThuocService {

	@Autowired
	private DanhMucThuocRepo danhMucThuocRepo;

	private final ModelMapper modelMapper = new ModelMapper();

	@Override
	public ResponseDTO<List<DanhMucThuoc>> getAll() {
		List<DanhMucThuoc> danhMucThuocs = danhMucThuocRepo.findAll();
		return ResponseDTO.<List<DanhMucThuoc>>builder().status(200).msg("Thành công").data(danhMucThuocs).build();
	}

	@Override
	@Transactional
	public ResponseDTO<DanhMucThuoc> create(DanhMucThuocDTO danhMucThuocDTO) {
		DanhMucThuoc danhMucThuoc = modelMapper.map(danhMucThuocDTO, DanhMucThuoc.class);
		if (danhMucThuocRepo.existsByTenDanhMuc(danhMucThuoc.getTenDanhMuc())) {
			return ResponseDTO.<DanhMucThuoc>builder().status(409).msg("Danh mục thuốc đã tồn tại").build();
		}
		DanhMucThuoc savedDanhMucThuoc = danhMucThuocRepo.save(danhMucThuoc);
		return ResponseDTO.<DanhMucThuoc>builder().status(201).msg("Tạo danh mục thuốc thành công")
				.data(savedDanhMucThuoc).build();
	}

	@Override
	@Transactional
	public ResponseDTO<DanhMucThuoc> update(DanhMucThuocDTO danhMucThuocDTO) {
		Optional<DanhMucThuoc> existingDanhMucThuoc = danhMucThuocRepo.findById(danhMucThuocDTO.getId());
		if (existingDanhMucThuoc.isPresent()) {
			DanhMucThuoc updatedDanhMucThuoc = modelMapper.map(danhMucThuocDTO, DanhMucThuoc.class);
			updatedDanhMucThuoc = danhMucThuocRepo.save(updatedDanhMucThuoc);
			return ResponseDTO.<DanhMucThuoc>builder().status(200).msg("Cập nhật danh mục thuốc thành công")
					.data(updatedDanhMucThuoc).build();
		}
		return ResponseDTO.<DanhMucThuoc>builder().status(404).msg("Không tìm thấy danh mục thuốc").build();
	}

	@Override
	@Transactional
	public ResponseDTO<Void> delete(Integer id) {
		danhMucThuocRepo.deleteById(id);
		return ResponseDTO.<Void>builder().status(200).msg("Thành công").build();
	}
}
