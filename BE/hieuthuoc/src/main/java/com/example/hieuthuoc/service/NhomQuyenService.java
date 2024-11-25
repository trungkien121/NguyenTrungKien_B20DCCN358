package com.example.hieuthuoc.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.hieuthuoc.dto.NhomQuyenDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.entity.NhomQuyen;
import com.example.hieuthuoc.repository.NhomQuyenRepo;

public interface NhomQuyenService {

	ResponseDTO<NhomQuyen> create(NhomQuyenDTO nhomQuyenDTO);

	ResponseDTO<NhomQuyen> update(NhomQuyenDTO nhomQuyenDTO);

	ResponseDTO<Void> delete(Integer id);

	ResponseDTO<NhomQuyen> getById(Integer id);

	ResponseDTO<List<NhomQuyen>> getAll();
}

@Service
class NhomQuyenServiceImpl implements NhomQuyenService {

	@Autowired
	private NhomQuyenRepo nhomQuyenRepo;

	private final ModelMapper modelMapper = new ModelMapper();

	@Override
	@Transactional
	public ResponseDTO<NhomQuyen> create(NhomQuyenDTO nhomQuyenDTO) {
		if (nhomQuyenRepo.existsByTenNhomQuyen(nhomQuyenDTO.getTenNhomQuyen())) {
			return ResponseDTO.<NhomQuyen>builder().status(409).msg("Nhóm quyền đã tồn tại").build();
		}
		NhomQuyen nhomQuyen = modelMapper.map(nhomQuyenDTO, NhomQuyen.class);
		NhomQuyen savedNhomQuyen = nhomQuyenRepo.save(nhomQuyen);
		return ResponseDTO.<NhomQuyen>builder().status(201).msg("Tạo nhóm quyền thành công").data(savedNhomQuyen)
				.build();
	}

	@Override
	@Transactional
	public ResponseDTO<NhomQuyen> update(NhomQuyenDTO nhomQuyenDTO) {
		Optional<NhomQuyen> existingNhomQuyen = nhomQuyenRepo.findById(nhomQuyenDTO.getId());
		if (existingNhomQuyen.isPresent()) {
			NhomQuyen updatedNhomQuyen = modelMapper.map(nhomQuyenDTO, NhomQuyen.class);
			updatedNhomQuyen = nhomQuyenRepo.save(updatedNhomQuyen);
			return ResponseDTO.<NhomQuyen>builder().status(200).msg("Cập nhật nhóm quyền thành công")
					.data(updatedNhomQuyen).build();
		}
		return ResponseDTO.<NhomQuyen>builder().status(404).msg("Không tìm thấy nhóm quyền").build();
	}

	@Override
	@Transactional
	public ResponseDTO<Void> delete(Integer id) {
		nhomQuyenRepo.deleteById(id);
		return ResponseDTO.<Void>builder().status(200).msg("Xóa nhóm quyền thành công").build();
	}
	
	@Override
	public ResponseDTO<NhomQuyen> getById(Integer id) {
		Optional<NhomQuyen> nhomQuyen = nhomQuyenRepo.findById(id);
		if (nhomQuyen.isPresent()) {
			return ResponseDTO.<NhomQuyen>builder().status(200).msg("Thành công").data(nhomQuyen.get()).build();
		}
		return ResponseDTO.<NhomQuyen>builder().status(404).msg("Không tìm thấy nhóm quyền").build();
	}

	@Override
	public ResponseDTO<List<NhomQuyen>> getAll() {
		List<NhomQuyen> nhomQuyens = nhomQuyenRepo.findAll();
		return ResponseDTO.<List<NhomQuyen>>builder().status(200).msg("Thành công").data(nhomQuyens).build();
	}
}
