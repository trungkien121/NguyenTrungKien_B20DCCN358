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

import com.example.hieuthuoc.dto.LoaiThuocDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.entity.LoaiThuoc;
import com.example.hieuthuoc.service.LoaiThuocService;

@RestController
@RequestMapping("/loaithuoc")
public class LoaiThuocController {
	@Autowired
	LoaiThuocService loaiThuocService;

	// Lấy tất cả loại thuốc
	@GetMapping("/list")
	public ResponseDTO<List<LoaiThuoc>> getAll() {
		return loaiThuocService.getAllLoaiThuocs();
	}

//	Lấy danh mục thuốc theo tên
	@GetMapping("/search_by_ten_loai")
	public ResponseDTO<List<LoaiThuoc>> searchByTenLoai(@RequestParam("tenLoai") String tenLoai) {
		return loaiThuocService.searchByTenLoai(tenLoai);

	}
	
	// Tạo mới loại thuốc
	@PostMapping("create")
	public ResponseDTO<LoaiThuoc> create(@RequestBody LoaiThuocDTO loaiThuocDTO) {
		return loaiThuocService.create(loaiThuocDTO);
	}

	// Cập nhật loại thuốc
	@PutMapping("/update")
	public ResponseDTO<LoaiThuoc> update(@RequestBody LoaiThuocDTO loaiThuocDTO) {
		return loaiThuocService.update(loaiThuocDTO);
	}

	// Xóa loại thuốc
	@DeleteMapping("/delete")
	public ResponseDTO<Void> delete(@RequestParam int id) {
		return loaiThuocService.delete(id);
	}
}
