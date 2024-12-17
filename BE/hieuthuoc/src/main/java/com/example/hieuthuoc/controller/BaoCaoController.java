package com.example.hieuthuoc.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.hieuthuoc.dto.DoanhThuDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.repository.DonHangRepo;

@RestController
@RequestMapping("/baocao")
public class BaoCaoController {

	@Autowired
	DonHangRepo donHangRepo;

	@GetMapping("/doanhthutheongay")
	public ResponseDTO<List<DoanhThuDTO>> doanhThuTheoNgay(
			@RequestParam("ngay") @DateTimeFormat(pattern = "yyyy-MM-dd") Date ngay) {
		List<DoanhThuDTO> doanhThuDTOs = donHangRepo.doanhThuTheoNgay(ngay);
		return ResponseDTO.<List<DoanhThuDTO>>builder().status(200).msg("Thành công.").data(doanhThuDTOs).build();
	}

	@GetMapping("/doanhthutheothang")
	public ResponseDTO<List<DoanhThuDTO>> doanhThuTheoThang(@RequestParam("nam") int nam,
			@RequestParam("thang") int thang) {
		List<DoanhThuDTO> doanhThuDTOs = donHangRepo.doanhThuTheoThang(nam,
				thang);
		return ResponseDTO.<List<DoanhThuDTO>>builder().status(200).msg("Thành công.").data(doanhThuDTOs).build();
	}

	@GetMapping("/doanhthutheonam")
	public ResponseDTO<List<DoanhThuDTO>> doanhThuTheoNam(@RequestParam("nam") int nam) {
		List<DoanhThuDTO> doanhThuDTOs = donHangRepo.doanhThuTheoNam(nam);
		return ResponseDTO.<List<DoanhThuDTO>>builder().status(200).msg("Thành công.").data(doanhThuDTOs).build();
	}
}
