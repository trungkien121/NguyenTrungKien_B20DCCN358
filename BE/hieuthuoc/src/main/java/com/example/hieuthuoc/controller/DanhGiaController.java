package com.example.hieuthuoc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
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

	@PostMapping("/list")
	public ResponseDTO<PageDTO<List<DanhGia>>> getAll(@RequestBody @Valid SearchDTO searchDTO) throws Exception {
		return danhgiaService.getAll(searchDTO);
	}

	@PostMapping("/create")
	public ResponseDTO<DanhGia> create(@RequestBody @Valid DanhGiaDTO danhGiaDTO) throws Exception {
		return danhgiaService.create(danhGiaDTO);
	}

	@PutMapping("/update")
	public ResponseDTO<DanhGia> update(@RequestBody @Valid DanhGiaDTO danhGiaDTO) throws Exception {
		return danhgiaService.update(danhGiaDTO);
	}

	@DeleteMapping("/delete")
	public ResponseDTO<Void> delete(@RequestParam("id") @Valid int id) {
		return danhgiaService.delete(id);
	}
}
