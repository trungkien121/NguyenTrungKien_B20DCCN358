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

import com.example.hieuthuoc.dto.PageDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.dto.SearchDTO;
import com.example.hieuthuoc.dto.ThuocDTO;
import com.example.hieuthuoc.entity.Thuoc;
import com.example.hieuthuoc.service.ThuocService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/thuoc")
public class ThuocController {

	@Autowired
	ThuocService thuocService;

	@PostMapping("/list")
	public ResponseDTO<PageDTO<List<ThuocDTO>>> getByTenThuoc(@RequestBody @Valid SearchDTO searchDTO)
			throws Exception {

		PageDTO<List<ThuocDTO>> thuocDTOs = thuocService.getByTenThuoc(searchDTO);
		return ResponseDTO.<PageDTO<List<ThuocDTO>>>builder().status(200).msg("ok").data(thuocDTOs).build();
	}
	
	@GetMapping("/get")
	public ResponseDTO<Optional<ThuocDTO>> getById(@RequestParam("id") @Valid int id){
		Optional<ThuocDTO> thuocDTO = thuocService.getById(id); 
		return ResponseDTO.<Optional<ThuocDTO>>builder().status(200).msg("ok").data(thuocDTO).build();
	}
	
	@PostMapping("/create")
	public ResponseDTO<ThuocDTO> create(@RequestBody @Valid ThuocDTO thuocDTO)
			throws Exception {

		thuocService.create(thuocDTO);
		return ResponseDTO.<ThuocDTO>builder().status(200).msg("ok").data(thuocDTO).build();
	}

	@PutMapping("/update")
	public ResponseDTO<Thuoc> update(@RequestBody @Valid ThuocDTO thuocDTO)
			throws Exception {
		Thuoc thuoc = thuocService.update(thuocDTO);
		return ResponseDTO.<Thuoc>builder().status(200).msg("ok").data(thuoc).build();
	}
	
	@DeleteMapping("/delete")
	public ResponseDTO<Void> delete(@RequestParam("id") @Valid int id){
		thuocService.delete(id);
		return ResponseDTO.<Void>builder().status(200).msg("ok").build();
	}
}
