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

import com.example.hieuthuoc.dto.NguoiDungDTO;
import com.example.hieuthuoc.dto.PageDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.dto.SearchDTO;
import com.example.hieuthuoc.service.NguoiDungService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/nguoidung")
public class NguoiDungController {

	@Autowired
	NguoiDungService nguoiDungService;
	
	@GetMapping("/get")
	public ResponseDTO<NguoiDungDTO> getById(@RequestParam("id") int id)
			throws Exception {

		NguoiDungDTO nguoiDungDTO = nguoiDungService.getById(id);
		return ResponseDTO.<NguoiDungDTO>builder().status(200).msg("ok").data(nguoiDungDTO).build();
	}

	@PostMapping("/list")
	public ResponseDTO<PageDTO<List<NguoiDungDTO>>> getByName(@RequestBody @Valid SearchDTO searchDTO)
			throws Exception {

		PageDTO<List<NguoiDungDTO>> nguoiDungDTOs = nguoiDungService.getByHoTen(searchDTO);
		return ResponseDTO.<PageDTO<List<NguoiDungDTO>>>builder().status(200).msg("ok").data(nguoiDungDTOs).build();
	}
	
	
	@PostMapping("/create")
	public ResponseDTO<NguoiDungDTO> create(@RequestBody @Valid NguoiDungDTO nguoiDungDTO)
			throws Exception {

		nguoiDungService.create(nguoiDungDTO);
		return ResponseDTO.<NguoiDungDTO>builder().status(200).msg("ok").data(nguoiDungDTO).build();
	}

	@PutMapping("/update")
	public ResponseDTO<NguoiDungDTO> update(@RequestBody @Valid NguoiDungDTO nguoiDungDTO)
			throws Exception {

		nguoiDungService.update(nguoiDungDTO);
		return ResponseDTO.<NguoiDungDTO>builder().status(200).msg("ok").data(nguoiDungDTO).build();
	}

	@DeleteMapping("/delete")
	public ResponseDTO<Void> delete(@RequestParam("id") int id) {
		nguoiDungService.delete(id);
		return ResponseDTO.<Void>builder().status(200).msg("ok").build();
	}
}
