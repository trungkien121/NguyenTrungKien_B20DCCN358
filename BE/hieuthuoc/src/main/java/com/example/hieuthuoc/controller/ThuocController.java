package com.example.hieuthuoc.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.dto.ThuocDTO;
import com.example.hieuthuoc.service.ThuocService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/thuoc")
public class ThuocController {

	@Autowired
	ThuocService thuocService;

	
	@GetMapping("/get")
	public ResponseDTO<Optional<ThuocDTO>> getThuocById(@RequestParam("id") @Valid int id){
		Optional<ThuocDTO> thuocDTO = thuocService.getThuocById(id); 
		return ResponseDTO.<Optional<ThuocDTO>>builder().status(200).msg("ok").data(thuocDTO).build();
	}
	
	@PostMapping("/save")
	public ResponseDTO<ThuocDTO> createThuoc(@ModelAttribute @Valid ThuocDTO thuocDTO)
			throws Exception {

		thuocService.save(thuocDTO);
		return ResponseDTO.<ThuocDTO>builder().status(200).msg("ok").data(thuocDTO).build();
	}

	@PutMapping("/update")
	public ResponseDTO<ThuocDTO> updateThuoc(@ModelAttribute @Valid ThuocDTO thuocDTO)
			throws Exception {

		thuocService.save(thuocDTO);
		return ResponseDTO.<ThuocDTO>builder().status(200).msg("ok").data(thuocDTO).build();
	}
	
	@DeleteMapping("/delete")
	public ResponseDTO<Void> deleteThuoc(@RequestParam("id") @Valid int id){
		thuocService.delete(id);
		return ResponseDTO.<Void>builder().status(200).msg("ok").build();
	}
}
