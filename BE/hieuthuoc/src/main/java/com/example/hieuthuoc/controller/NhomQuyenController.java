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

import com.example.hieuthuoc.dto.NhomQuyenDTO;
import com.example.hieuthuoc.dto.PageDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.dto.SearchDTO;
import com.example.hieuthuoc.entity.NhomQuyen;
import com.example.hieuthuoc.service.NhomQuyenService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/nhomquyen")
public class NhomQuyenController {

	@Autowired
	NhomQuyenService nhomQuyenService;

	@GetMapping("/get")
	public ResponseDTO<NhomQuyen> getById(@RequestParam @Valid int id) {
		return nhomQuyenService.getById(id);
	}

	@PostMapping("/list")
	public ResponseDTO<PageDTO<List<NhomQuyen>>> getByTenNhomQuyen(@RequestBody @Valid SearchDTO searchDTO) {
		return nhomQuyenService.getByTenNhomQuyen(searchDTO);
	}

	@PostMapping("/create")
	public ResponseDTO<NhomQuyen> create(@RequestBody @Valid NhomQuyenDTO nhomQuyenDTO) {	
		return nhomQuyenService.create(nhomQuyenDTO);
	}

	@PutMapping("/update")
	public ResponseDTO<NhomQuyen> update(@RequestBody @Valid NhomQuyenDTO nhomQuyenDTO) {
		return nhomQuyenService.update(nhomQuyenDTO);
	}

	@DeleteMapping("/delete")
	public ResponseDTO<Void> delete(@RequestParam @Valid int id) {
		return nhomQuyenService.delete(id);
	}
}
