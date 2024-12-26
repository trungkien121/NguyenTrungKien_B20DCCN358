package com.example.hieuthuoc.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.hieuthuoc.dto.DanhMucThuocDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.entity.DanhMucThuoc;
import com.example.hieuthuoc.repository.DanhMucThuocRepo;
import com.example.hieuthuoc.repository.LoaiThuocRepo;

public interface DanhMucThuocService {
	ResponseDTO<List<DanhMucThuoc>> getAll();

	ResponseDTO<List<DanhMucThuoc>> getDanhMucAnhLoaiThuoc();

	ResponseDTO<List<DanhMucThuoc>> searchByTenDanhMuc(String tenDanhMuc);

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
//	@Cacheable(value = "danhMucThuocCache", key = "'allDanhMuc'")
	public ResponseDTO<List<DanhMucThuoc>> getAll() {
		List<DanhMucThuoc> danhMucThuocs = danhMucThuocRepo.findAll();
		return ResponseDTO.<List<DanhMucThuoc>>builder().status(200).msg("Thành công").data(danhMucThuocs).build();
	}

	@Override
//	@Cacheable(value = "danhMucThuocCache", key = "'allDanhMucAndLoaiThuoc'")
	public ResponseDTO<List<DanhMucThuoc>> getDanhMucAnhLoaiThuoc() {
		List<DanhMucThuoc> danhMucThuocs = danhMucThuocRepo.findAllWithLoaiThuocs();
		return ResponseDTO.<List<DanhMucThuoc>>builder().status(200).msg("Thành công").data(danhMucThuocs).build();
	}

	@Override
//	@Cacheable(value = "danhMucThuocCache", key = "'tenDanhMuc'")
	public ResponseDTO<List<DanhMucThuoc>> searchByTenDanhMuc(String tenDanhMuc) {
		List<DanhMucThuoc> danhMucThuocs = danhMucThuocRepo.searchByTenDanhMuc(tenDanhMuc);
		if (danhMucThuocs != null && !danhMucThuocs.isEmpty()) {
			return ResponseDTO.<List<DanhMucThuoc>>builder().status(200).msg("Thành công").data(danhMucThuocs).build();
		}
		return ResponseDTO.<List<DanhMucThuoc>>builder().status(409).msg("Danh mục thuốc không tồn tại").build();
	}

	@Override
	@Transactional
//	@CachePut(value = "danhMucThuocCache", key = "#result.data.id")
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
//	@CachePut(value = "danhMucThuocCache", key = "#result.data.id")
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
	@CacheEvict(value = "danhMucThuocCache", key = "#id")
	public ResponseDTO<Void> delete(Integer id) {
		if (!danhMucThuocRepo.existsById(id)) {
			return ResponseDTO.<Void>builder().status(404).msg("Không tìm thấy danh mục thuốc để xóa").build();
		}
		danhMucThuocRepo.deleteById(id);
		return ResponseDTO.<Void>builder().status(200).msg("Xóa danh mục thuốc thành công").build();
	}

}
