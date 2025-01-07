package com.example.hieuthuoc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hieuthuoc.dto.PageDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.dto.SearchLichSuHoatDongDTO;
import com.example.hieuthuoc.entity.LichSuHoatDong;
import com.example.hieuthuoc.service.LichSuHoatDongService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/lichsuhoatdong")
public class LichSuHoatDongController {
	@Autowired
	LichSuHoatDongService lichSuHoatDongService;

	// search Theo ngay bắt đầu và ngày kết thúc
	@PostMapping("/search")
	public ResponseDTO<PageDTO<List<LichSuHoatDong>>> search(@RequestBody @Valid SearchLichSuHoatDongDTO searchLichSuHoatDongDTO){
		return lichSuHoatDongService.search(searchLichSuHoatDongDTO);
	}
}
