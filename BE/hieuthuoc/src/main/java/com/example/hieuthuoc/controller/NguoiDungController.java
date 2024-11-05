package com.example.hieuthuoc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	public ResponseDTO<NguoiDungDTO> getNguoiDungById(@RequestParam("id") int id)
			throws Exception {

		NguoiDungDTO nguoiDungDTO = nguoiDungService.getNguoiDungById(id);
		return ResponseDTO.<NguoiDungDTO>builder().status(200).msg("ok").data(nguoiDungDTO).build();
	}

	@GetMapping("/list")
	public ResponseDTO<PageDTO<List<NguoiDungDTO>>> getNguoiDungByName(@ModelAttribute @Valid SearchDTO searchDTO)
			throws Exception {

		PageDTO<List<NguoiDungDTO>> nguoiDungDTOs = nguoiDungService.getNguoiDungByName(searchDTO);
		return ResponseDTO.<PageDTO<List<NguoiDungDTO>>>builder().status(200).msg("ok").data(nguoiDungDTOs).build();
	}
	
	
	@PostMapping("/save")
	public ResponseDTO<NguoiDungDTO> createNguoiDung(@ModelAttribute @Valid NguoiDungDTO nguoiDungDTO)
			throws Exception {

		nguoiDungService.save(nguoiDungDTO);
		return ResponseDTO.<NguoiDungDTO>builder().status(200).msg("ok").data(nguoiDungDTO).build();
	}

	@PutMapping("/update")
	public ResponseDTO<NguoiDungDTO> updateNguoiDung(@ModelAttribute @Valid NguoiDungDTO nguoiDungDTO)
			throws Exception {

		nguoiDungService.save(nguoiDungDTO);
		return ResponseDTO.<NguoiDungDTO>builder().status(200).msg("ok").data(nguoiDungDTO).build();
	}

	@DeleteMapping("/delete")
	public ResponseDTO<Void> deleteNguoiDung(@RequestParam("id") int id) {
		nguoiDungService.delete(id);
		return ResponseDTO.<Void>builder().status(200).msg("ok").build();
	}
}
