package com.example.hieuthuoc.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.hieuthuoc.dto.NhomQuyenDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.service.NhomQuyenService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/nhomquyen")
public class NhomQuyenController {

	@Autowired
	NhomQuyenService nhomQuyenService;

	@GetMapping("/get")
	public ResponseDTO<Optional<NhomQuyenDTO>> getById(@RequestParam @Valid int id) {
		Optional<NhomQuyenDTO> nhomQuyenDTO = nhomQuyenService.getById(id);
		return ResponseDTO.<Optional<NhomQuyenDTO>>builder().status(200).msg("ok").data(nhomQuyenDTO).build();
	}

	@GetMapping("/getAll")
	public ResponseDTO<List<NhomQuyenDTO>> getAll() {
		List<NhomQuyenDTO> nhomQuyenDTOs = nhomQuyenService.getAll();
		return ResponseDTO.<List<NhomQuyenDTO>>builder().status(200).msg("ok").data(nhomQuyenDTOs).build();
	}

	@PostMapping("/create")
	public ResponseDTO<NhomQuyenDTO> create(@RequestBody @Valid NhomQuyenDTO nhomQuyenDTO) {
		nhomQuyenService.create(nhomQuyenDTO);
		return ResponseDTO.<NhomQuyenDTO>builder().status(200).msg("ok").data(nhomQuyenDTO).build();
	}

	@PutMapping("/update")
	public ResponseDTO<NhomQuyenDTO> update(@RequestBody @Valid NhomQuyenDTO nhomQuyenDTO) {
		nhomQuyenService.update(nhomQuyenDTO);
		return ResponseDTO.<NhomQuyenDTO>builder().status(200).msg("ok").data(nhomQuyenDTO).build();
	}

	@DeleteMapping("/delete")
	public ResponseDTO<Void> delete(@RequestParam @Valid int id) {
		nhomQuyenService.delete(id);
		return ResponseDTO.<Void>builder().status(200).msg("ok").build();
	}
}
