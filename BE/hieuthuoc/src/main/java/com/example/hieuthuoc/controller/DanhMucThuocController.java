package com.example.hieuthuoc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.hieuthuoc.dto.DanhMucThuocDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.entity.DanhMucThuoc;
import com.example.hieuthuoc.service.DanhMucThuocService;

@RestController
@RequestMapping("/danhmucthuoc")
public class DanhMucThuocController {

	@Autowired
	private DanhMucThuocService danhMucThuocService;

//	Lấy tất cả danh mục thuốc
	@GetMapping("/list")
	public ResponseDTO<List<DanhMucThuoc>> getAll() {
		return danhMucThuocService.getAll();

	}
	
	@GetMapping("/get_danh_muc_and_loai_thuoc")
	public ResponseDTO<List<DanhMucThuoc>> getDanhMucAnhLoaiThuoc() {
		return danhMucThuocService.getDanhMucAnhLoaiThuoc();

	}
	
//	Lấy danh mục thuốc theo tên
	@GetMapping("/search_by_ten_danh_muc")
	public ResponseDTO<List<DanhMucThuoc>> searchByTenDanhMuc(@RequestParam("tenDanhMuc") String tenDanhMuc) {
		return danhMucThuocService.searchByTenDanhMuc(tenDanhMuc);

	}

//	Tạo danh mục thuốc mới
	@PostMapping("/create")
	public ResponseDTO<DanhMucThuoc> create(@RequestBody DanhMucThuocDTO danhMucThuocDTO) {

		return danhMucThuocService.create(danhMucThuocDTO);
	}

//	Cập nhật thông tin danh mục thuốc
	@PutMapping("/update")
	public ResponseDTO<DanhMucThuoc> update(@RequestBody DanhMucThuocDTO danhMucThuocDTO) {
		return danhMucThuocService.update(danhMucThuocDTO);
	}

//	Xóa danh mục thuốc
	@DeleteMapping("/delete")
	public ResponseDTO<Void> delete(@RequestParam Integer id) {
		return danhMucThuocService.delete(id);
	}
}
