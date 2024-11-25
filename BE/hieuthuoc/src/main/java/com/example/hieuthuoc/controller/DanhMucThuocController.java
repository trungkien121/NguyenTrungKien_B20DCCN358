package com.example.hieuthuoc.controller;

import com.example.hieuthuoc.dto.DanhMucThuocDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.entity.DanhMucThuoc;
import com.example.hieuthuoc.service.DanhMucThuocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/danhmucthuoc")
public class DanhMucThuocController {

	@Autowired
	private DanhMucThuocService danhMucThuocService;

//	Lấy tất cả danh mục thuốc
	@GetMapping("/list")
	public ResponseEntity<ResponseDTO<List<DanhMucThuoc>>> getAll() {
		ResponseDTO<List<DanhMucThuoc>> response = danhMucThuocService.getAll();
		return ResponseEntity.status(response.getStatus()).body(response);
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
