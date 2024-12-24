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

import com.example.hieuthuoc.dto.NhaCungCapDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.entity.NhaCungCap;
import com.example.hieuthuoc.service.NhaCungCapService;

@RestController
@RequestMapping("nhacungcap")
public class NhaCungCapController {

	@Autowired
	private NhaCungCapService nhaCungCapService;

	// Lấy danh sách nhà cung cấp
	@GetMapping("/list")
	public ResponseDTO<List<NhaCungCap>> getAll() {
		return nhaCungCapService.getAll();
	}

	@GetMapping("/search_by_ten_nha_cung_cap")
	public ResponseDTO<List<NhaCungCap>> searchByTenNhaCungCap(@RequestParam("tenNhaCungCap") String tenNhaCungCap) {
		return nhaCungCapService.searchByTenNhaCungCap(tenNhaCungCap);
	}

	
	// Tạo mới nhà cung cấp
	@PostMapping("/create")
	public ResponseDTO<NhaCungCap> create(@RequestBody NhaCungCapDTO nhaCungCapDTO) {
		return nhaCungCapService.create(nhaCungCapDTO);
	}

	// Cập nhật thông tin nhà cung cấp
	@PutMapping("/update")
	public ResponseDTO<NhaCungCap> update(@RequestBody NhaCungCapDTO nhaCungCapDTO) {
		return nhaCungCapService.update(nhaCungCapDTO);
	}

	// Xóa nhà cung cấp theo ID
	@DeleteMapping("/delete")
	public ResponseDTO<Void> delete(@RequestParam("id") Integer id) {
		return nhaCungCapService.delete(id);
	}
}
