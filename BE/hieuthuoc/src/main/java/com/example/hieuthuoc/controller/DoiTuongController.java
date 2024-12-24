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

import com.example.hieuthuoc.dto.DoiTuongDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.entity.DoiTuong;
import com.example.hieuthuoc.service.DoiTuongService;

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
	
	@GetMapping("/search_by_ten_doi_tuong")
	public ResponseDTO<List<DoiTuong>> getByTenNhaSanXuat(@RequestParam("tenDoiTuong") String tenDoiTuong) {
		return doiTuongService.searchByTenDoiTuong(tenDoiTuong);
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
