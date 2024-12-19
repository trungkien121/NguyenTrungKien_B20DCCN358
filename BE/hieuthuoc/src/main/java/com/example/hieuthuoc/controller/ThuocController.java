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

import com.example.hieuthuoc.dto.PageDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.dto.SearchDTO;
import com.example.hieuthuoc.dto.SearchThuocDTO;
import com.example.hieuthuoc.dto.ThuocDTO;
import com.example.hieuthuoc.entity.Thuoc;
import com.example.hieuthuoc.service.ThuocService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/thuoc")
public class ThuocController {

	@Autowired
	ThuocService thuocService;
	
	@PostMapping("/get_thuoc_ban_chay")
	public ResponseDTO<PageDTO<List<Thuoc>>> getThuocBanChay(@RequestBody @Valid SearchDTO searchDTO)
			throws Exception {
		return thuocService.getThuocBanChay(searchDTO);
	}

	@PostMapping("/search")
	public ResponseDTO<PageDTO<List<Thuoc>>> search(@RequestBody @Valid SearchThuocDTO searchThuocDTO)
			throws Exception {
		return thuocService.search(searchThuocDTO);
	}

	@GetMapping("/get")
	public ResponseDTO<Thuoc> getById(@RequestParam("id") @Valid int id) {
		return thuocService.getById(id);
	}

	@PostMapping("/create")
	public ResponseDTO<Thuoc> create(@RequestPart @Valid ThuocDTO thuocDTO, @RequestPart(value = "file", required = false) MultipartFile file)
			throws Exception {
		if(file != null && !file.isEmpty()) {
			thuocDTO.setFile(file);
		}
		return thuocService.create(thuocDTO);
	}

	@PutMapping("/update")
	public ResponseDTO<Thuoc> update(@RequestPart @Valid ThuocDTO thuocDTO,  @RequestPart(value = "file", required = false) MultipartFile file)
			throws Exception {
		if(file != null && !file.isEmpty()) {
			thuocDTO.setFile(file);
		}
		return thuocService.update(thuocDTO);
	}

	@DeleteMapping("/delete")
	public ResponseDTO<Void> delete(@RequestParam("id") @Valid int id) {
		return thuocService.delete(id);
	}
}
