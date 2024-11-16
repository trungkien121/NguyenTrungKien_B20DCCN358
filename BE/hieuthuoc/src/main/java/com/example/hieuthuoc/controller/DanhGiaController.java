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

import com.example.hieuthuoc.dto.DanhGiaDTO;
import com.example.hieuthuoc.dto.PageDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.dto.SearchDTO;
import com.example.hieuthuoc.entity.DanhGia;
import com.example.hieuthuoc.service.DanhGiaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/danhgia")
public class DanhGiaController {
	@Autowired
	DanhGiaService danhgiaService;
	
	@GetMapping("/get")
	public ResponseDTO<Optional<DanhGiaDTO>> getById(@RequestParam("id") @Valid int id){
		Optional<DanhGiaDTO> danhGia = danhgiaService.getById(id); 
		return ResponseDTO.<Optional<DanhGiaDTO>>builder().status(200).msg("ok").data(danhGia).build();
	}
	
	@PostMapping("/list")
	public ResponseDTO<PageDTO<List<DanhGiaDTO>>> getByThuocId(@RequestBody @Valid SearchDTO searchDTO)
			throws Exception {

		PageDTO<List<DanhGiaDTO>> danhGiaDTOs = danhgiaService.getByThuocId(searchDTO);
		return ResponseDTO.<PageDTO<List<DanhGiaDTO>>>builder().status(200).msg("ok").data(danhGiaDTOs).build();
	}
	
	@PostMapping("/create")
	public ResponseDTO<DanhGiaDTO> create(@RequestBody @Valid DanhGiaDTO danhGiaDTO)
			throws Exception {

		danhgiaService.create(danhGiaDTO);
		return ResponseDTO.<DanhGiaDTO>builder().status(200).msg("ok").data(danhGiaDTO).build();
	}

	@PutMapping("/update")
	public ResponseDTO<DanhGia> update(@RequestBody @Valid DanhGiaDTO danhGiaDTO)
			throws Exception {
		DanhGia danhGia = danhgiaService.update(danhGiaDTO);
		return ResponseDTO.<DanhGia>builder().status(200).msg("ok").data(danhGia).build();
	}
	
	@DeleteMapping("/delete")
	public ResponseDTO<Void> delete(@RequestParam("id") @Valid int id){
		danhgiaService.delete(id);
		return ResponseDTO.<Void>builder().status(200).msg("ok").build();
	}
}
