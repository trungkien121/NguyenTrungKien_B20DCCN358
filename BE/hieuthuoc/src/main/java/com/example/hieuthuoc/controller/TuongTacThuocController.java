package com.example.hieuthuoc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.entity.TuongTacThuoc;
import com.example.hieuthuoc.service.TuongTacThuocService;

@RestController
@RequestMapping("/tuongtacthuoc")
public class TuongTacThuocController {
	@Autowired
	private TuongTacThuocService tuongTacThuocService;

	@GetMapping("/get")
	public ResponseDTO<TuongTacThuoc> checkThanhPhan(@RequestParam String hoatChat1, @RequestParam String hoatChat2) {

		return tuongTacThuocService.checkThanhPhan(hoatChat1, hoatChat2);
	}
}
