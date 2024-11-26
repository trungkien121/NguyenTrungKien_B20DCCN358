package com.example.hieuthuoc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.hieuthuoc.dto.ChiTietGioHangDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.entity.ChiTietGioHang;
import com.example.hieuthuoc.entity.GioHang;
import com.example.hieuthuoc.service.GioHangService;

@RestController
@RequestMapping("/giohang")
public class GioHangController {

	@Autowired
	private GioHangService gioHangService;

	// Lấy thông tin giỏ hàng theo ID người dùng
	@GetMapping("/get")
	public ResponseDTO<GioHang> getByNguoiDungId(@RequestParam int nguoiDungId) {
		return gioHangService.getByNguoiDungId(nguoiDungId);
	}

	// Thêm sản phẩm vào giỏ hàng
	@PostMapping("/create")
	public ResponseDTO<ChiTietGioHang> createThuoc(@RequestBody ChiTietGioHangDTO chiTietGioHangDTO) {
		return gioHangService.createThuoc(chiTietGioHangDTO);
	}

	// Cập nhật thông tin sản phẩm trong giỏ hàng
	@PutMapping("/update")
	public ResponseDTO<ChiTietGioHang> updateThuoc(@RequestBody ChiTietGioHangDTO chiTietGioHangDTO) {
		return gioHangService.updateThuoc(chiTietGioHangDTO);
	}

	// Xóa sản phẩm khỏi giỏ hàng
	@DeleteMapping("/delete")
	public ResponseDTO<Void> deleteThuoc(@RequestParam int id) {
		return gioHangService.deleteThuoc(id);
	}
}
