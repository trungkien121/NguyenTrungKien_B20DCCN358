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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.hieuthuoc.dto.NguoiDungDTO;
import com.example.hieuthuoc.dto.PageDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.dto.SearchDTO;
import com.example.hieuthuoc.entity.NguoiDung;
import com.example.hieuthuoc.service.NguoiDungService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/nguoidung")
public class NguoiDungController {

	@Autowired
	NguoiDungService nguoiDungService;

	@GetMapping("/get")
	public ResponseDTO<NguoiDung> getById(@RequestParam("id") int id) throws Exception {

		return nguoiDungService.getById(id);
	}

	@PostMapping("/list")
	public ResponseDTO<PageDTO<List<NguoiDungDTO>>> getByName(@RequestBody @Valid SearchDTO searchDTO)
			throws Exception {

		return nguoiDungService.getByHoTen(searchDTO);
	}

	@PutMapping("/change_matkhau")
	public ResponseDTO<NguoiDung> changeMatKhau(@RequestBody @Valid NguoiDungDTO nguoiDungDTO) throws Exception {
		return nguoiDungService.changeMatKhau(nguoiDungDTO);
	}

	@PutMapping("/forgot_matkhau")
	public ResponseDTO<NguoiDung> forgotMatKhau(@RequestParam("email") @Valid String email) throws Exception {

		return nguoiDungService.forgotMatKhau(email);
	}

	@PutMapping("change_avatar")
	public ResponseDTO<NguoiDung> changeAvatar(@RequestPart(value = "nguoiDungDTO", required = false) NguoiDungDTO nguoiDungDTO,
			@RequestPart(value = "file", required = false) MultipartFile file) throws Exception {
		if (file != null && !file.isEmpty()) {
			nguoiDungDTO.setFile(file);
		}
		return nguoiDungService.changeAvatar(nguoiDungDTO);
	}

	@PostMapping("/dangky")
	public ResponseDTO<NguoiDung> register(@RequestBody @Valid NguoiDungDTO nguoiDungDTO) {

		return nguoiDungService.register(nguoiDungDTO);
	}

	@PostMapping("/create")
	public ResponseDTO<NguoiDung> create(@RequestBody @Valid NguoiDungDTO nguoiDungDTO) throws Exception {
		return nguoiDungService.create(nguoiDungDTO);
	}

	@PutMapping("/update")
	public ResponseDTO<NguoiDung> update(@RequestBody @Valid NguoiDungDTO nguoiDungDTO) throws Exception {

		return nguoiDungService.update(nguoiDungDTO);
	}

	@DeleteMapping("/delete")
	public ResponseDTO<Void> delete(@RequestParam("id") int id) {
		nguoiDungService.delete(id);
		return ResponseDTO.<Void>builder().status(200).msg("ok").build();
	}
}
