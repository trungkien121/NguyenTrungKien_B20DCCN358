package com.example.hieuthuoc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.hieuthuoc.dto.DoiTuongDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.entity.DoiTuong;
import com.example.hieuthuoc.service.DoiTuongService;

import java.util.List;

@RestController
@RequestMapping("/doituong")
public class DoiTuongController {

	@Autowired
	private DoiTuongService doiTuongService;

	// Lấy danh sách tất cả đối tượng
	@GetMapping("/list")
	public ResponseDTO<List<DoiTuong>> getAll() {
		return doiTuongService.getAll();
	}

	// Tạo mới đối tượng
	@PostMapping("/create")
	public ResponseDTO<DoiTuong> create(@RequestBody DoiTuongDTO doiTuongDTO) {
		return doiTuongService.create(doiTuongDTO);
	}

	// Cập nhật đối tượng
	@PutMapping("/update")
	public ResponseDTO<DoiTuong> update(@RequestBody DoiTuongDTO doiTuongDTO) {
		return doiTuongService.update(doiTuongDTO);
	}

	// Xóa đối tượng
	@DeleteMapping("/delete")
	public ResponseDTO<Void> delete(@RequestParam("id") Integer id) {
		return doiTuongService.delete(id);
	}
}
