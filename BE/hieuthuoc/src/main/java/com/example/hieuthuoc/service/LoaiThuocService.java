package com.example.hieuthuoc.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.hieuthuoc.dto.LoaiThuocDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.entity.DanhMucThuoc;
import com.example.hieuthuoc.entity.LoaiThuoc;
import com.example.hieuthuoc.repository.DanhMucThuocRepo;
import com.example.hieuthuoc.repository.LoaiThuocRepo;

public interface LoaiThuocService {
	ResponseDTO<List<LoaiThuoc>> getAllLoaiThuocs();

	ResponseDTO<List<LoaiThuoc>> searchByTenLoai(String tenLoai);

	ResponseDTO<LoaiThuoc> create(LoaiThuocDTO loaiThuocDTO);

	ResponseDTO<LoaiThuoc> update(LoaiThuocDTO loaiThuocDTO);

	ResponseDTO<Void> delete(Integer id);
}

@Service
class LoaiThuocServiceImpl implements LoaiThuocService {

	@Autowired
	private LoaiThuocRepo loaiThuocRepo;

	@Autowired
	private DanhMucThuocRepo danhMucThuocRepo;

	ModelMapper modelMapper = new ModelMapper();

	@Override
//	@Cacheable(value = "loaiThuocCache", key = "'allLoaiThuoc'")
	public ResponseDTO<List<LoaiThuoc>> getAllLoaiThuocs() {
		List<LoaiThuoc> loaiThuocs = loaiThuocRepo.findAll();
		return ResponseDTO.<List<LoaiThuoc>>builder().status(200).msg("Thành công").data(loaiThuocs).build();
	}

	@Override
//	@Cacheable(value = "danhMucThuocCache", key = "'tenDanhMuc' + #tenLoai")
	public ResponseDTO<List<LoaiThuoc>> searchByTenLoai(String tenLoai) {
		List<LoaiThuoc> loaiThuocs = loaiThuocRepo.searchByTenLoai(tenLoai);
		if (loaiThuocs != null && !loaiThuocs.isEmpty()) {
			return ResponseDTO.<List<LoaiThuoc>>builder().status(200).msg("Thành công").data(loaiThuocs).build();
		}
		return ResponseDTO.<List<LoaiThuoc>>builder().status(409).msg("Danh mục thuốc không tồn tại").build();
	}

	@Override
	@Transactional
//	@CachePut(value = "loaiThuocCache", key = "#result.data.id")
	public ResponseDTO<LoaiThuoc> create(LoaiThuocDTO loaiThuocDTO) {
		LoaiThuoc loaiThuoc = modelMapper.map(loaiThuocDTO, LoaiThuoc.class);
		if (loaiThuocRepo.existsByTenLoai(loaiThuoc.getTenLoai())) {
			return ResponseDTO.<LoaiThuoc>builder().status(409).msg("Loại thuốc đã tồn tại").build();
		}
		DanhMucThuoc danhMucThuoc = danhMucThuocRepo.findById(loaiThuocDTO.getDanhMucThuocId())
				.orElseThrow(() -> new RuntimeException("Danh mục thuốc không tồn tại"));

		loaiThuoc.setDanhMucThuoc(danhMucThuoc);
		LoaiThuoc savedLoaiThuoc = loaiThuocRepo.save(loaiThuoc);
		return ResponseDTO.<LoaiThuoc>builder().status(201).msg("Tạo loại thuốc thành công").data(savedLoaiThuoc)
				.build();
	}

	@Override
	@Transactional
//	@CachePut(value = "loaiThuocCache", key = "#result.data.id")
	public ResponseDTO<LoaiThuoc> update(LoaiThuocDTO loaiThuocDTO) {
		LoaiThuoc loaiThuoc = modelMapper.map(loaiThuocDTO, LoaiThuoc.class);
		LoaiThuoc currentLoaiThuoc = loaiThuocRepo.findById(loaiThuoc.getId()).orElse(null);
		if (currentLoaiThuoc != null) {
//			if (loaiThuocDTO.getDanhMucThuocId() != null && loaiThuocDTO.getDanhMucThuocId() != currentLoaiThuoc.getDanhMucThuoc().getId()) {
//				DanhMucThuoc danhMucThuoc = danhMucThuocRepo.findById(loaiThuocDTO.getDanhMucThuocId())
//						.orElseThrow(() -> new RuntimeException("Danh mục thuốc không tồn tại"));
//				loaiThuoc.setDanhMucThuoc(danhMucThuoc);
//			}
			LoaiThuoc updatedLoaiThuoc = loaiThuocRepo.save(loaiThuoc);
			return ResponseDTO.<LoaiThuoc>builder().status(200).msg("Cập nhật loại thuốc thành công")
					.data(updatedLoaiThuoc).build();
		}
		return ResponseDTO.<LoaiThuoc>builder().status(404).msg("Không tìm thấy loại thuốc").build();
	}

	@Override
	@Transactional
//	@CacheEvict(value = "loaiThuocCache", key = "#id")
	public ResponseDTO<Void> delete(Integer id) {
		if (!loaiThuocRepo.existsById(id)) {
			return ResponseDTO.<Void>builder().status(404).msg("Không tìm thấy loại thuốc để xóa").build();
		}
		loaiThuocRepo.deleteById(id);
		return ResponseDTO.<Void>builder().status(200).msg("Xóa loại thuốc thành công").build();
	}
}
