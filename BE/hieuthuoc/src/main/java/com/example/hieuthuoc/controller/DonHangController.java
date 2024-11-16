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
	public ResponseDTO<Optional<DonHangDTO>> getById(@RequestParam("id") @Valid int id){
		Optional<DonHangDTO> donhangDTO = donHangService.getById(id); 
		return ResponseDTO.<Optional<DonHangDTO>>builder().status(200).msg("ok").data(donhangDTO).build();
	}
	
	@PostMapping("/list")
	public ResponseDTO<PageDTO<List<DonHangDTO>>> getByTrangThaiGiaoHang(@RequestBody @Valid SearchDTO searchDTO)
			throws Exception {

		PageDTO<List<DonHangDTO>> donhangDTOs = donHangService.getByTrangThaiGiaoHang(searchDTO);
		return ResponseDTO.<PageDTO<List<DonHangDTO>>>builder().status(200).msg("ok").data(donhangDTOs).build();
	}
	
	@PostMapping("/create")
	public ResponseDTO<DonHangDTO> create(@RequestBody @Valid DonHangDTO donHangDTO)
			throws Exception {

		donHangService.create(donHangDTO);
		return ResponseDTO.<DonHangDTO>builder().status(200).msg("ok").data(donHangDTO).build();
	}

	@PutMapping("/update")
	public ResponseDTO<DonHang> update(@RequestBody @Valid DonHangDTO thuocDTO)
			throws Exception {
		DonHang donHang = donHangService.update(thuocDTO);
		return ResponseDTO.<DonHang>builder().status(200).msg("ok").data(donHang).build();
	}
	
	@DeleteMapping("/delete")
	public ResponseDTO<Void> delete(@RequestParam("id") @Valid int id){
		donHangService.delete(id);
		return ResponseDTO.<Void>builder().status(200).msg("ok").build();
	}
}
