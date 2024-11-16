package com.example.hieuthuoc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hieuthuoc.service.ThongBaoService;

@RestController
@RequestMapping("/thongbao")
public class ThongBaoController {

	@Autowired
	ThongBaoService thongBaoService;
	
	
	
}
