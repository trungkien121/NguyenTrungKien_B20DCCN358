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

import com.example.hieuthuoc.dto.DonHangDTO;
import com.example.hieuthuoc.dto.PageDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.dto.SearchDTO;
import com.example.hieuthuoc.entity.DonHang;
import com.example.hieuthuoc.service.DonHangService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/donhang")
public class DonHangController {

	@Autowired
	DonHangService donHangService;

	@GetMapping("/get")
	public ResponseDTO<DonHang> getById(@RequestParam("id") @Valid int id) {
		return donHangService.getById(id);
	}

	@PostMapping("/list")
	public ResponseDTO<PageDTO<List<DonHang>>> getByTrangThaiGiaoHang(@RequestBody @Valid SearchDTO searchDTO)
			throws Exception {

		System.out.println(searchDTO);
		return donHangService.getByTrangThaiGiaoHang(searchDTO);
	}

	@PostMapping("/changTrangThaiGiaoHang")
	public ResponseDTO<DonHang> changTrangThaiGiaoHang(@RequestBody DonHangDTO donHangDTO) throws Exception {

		return donHangService.changTrangThaiGiaoHang(donHangDTO);
	}

	@PostMapping("/changTrangThaiThanhToan")
	public ResponseDTO<DonHang> changTrangThaiThanhToan(@RequestBody DonHangDTO donHangDTO) throws Exception {

		return donHangService.changTrangThaiThanhToan(donHangDTO);
	}

	@PostMapping("/create")
	public ResponseDTO<DonHang> create(@RequestBody DonHangDTO donHangDTO) throws Exception {

		return donHangService.create(donHangDTO);
	}

	@PutMapping("/update")
	public ResponseDTO<DonHang> update(@RequestBody DonHangDTO thuocDTO) throws Exception {
		return donHangService.update(thuocDTO);
	}

	@DeleteMapping("/delete")
	public ResponseDTO<Void> delete(@RequestParam("id") @Valid int id) {

		return donHangService.delete(id);
	}
}
