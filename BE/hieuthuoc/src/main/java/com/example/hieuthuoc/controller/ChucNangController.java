package com.example.hieuthuoc.controller;

import com.example.hieuthuoc.dto.ChucNangDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.entity.ChucNang;
import com.example.hieuthuoc.service.ChucNangService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chucnang")
@CrossOrigin // Để cho phép gọi API từ các domain khác nhau
public class ChucNangController {

	@Autowired
	private ChucNangService chucNangService;

	// API để lấy danh sách tất cả chức năng
	@PostMapping("/list")
	public ResponseDTO<List<ChucNang>> getAll() {
		return chucNangService.getAllChucNangs();
	}

	// API để tạo mới một chức năng
	@PostMapping("/create")
	public ResponseDTO<ChucNang> create(@RequestBody ChucNangDTO chucNangDTO) {
		return chucNangService.create(chucNangDTO);
	}

	// API để cập nhật một chức năng
	@PutMapping("/update")
	public ResponseDTO<ChucNang> update(@RequestBody ChucNangDTO chucNangDTO) {
		return chucNangService.update(chucNangDTO);
	}

	// API để xóa một chức năng
	@DeleteMapping("/delete")
	public ResponseDTO<Void> delete(@RequestParam Integer id) {
		return chucNangService.delete(id);
	}
}
