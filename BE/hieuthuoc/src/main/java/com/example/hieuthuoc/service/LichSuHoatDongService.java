package com.example.hieuthuoc.service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.example.hieuthuoc.dto.PageDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.dto.SearchLichSuHoatDongDTO;
import com.example.hieuthuoc.entity.LichSuHoatDong;
import com.example.hieuthuoc.repository.LichSuHoatDongRepo;

public interface LichSuHoatDongService {
	ResponseDTO<PageDTO<List<LichSuHoatDong>>> search(SearchLichSuHoatDongDTO searchLichSuHoatDongDTO);
}

@Service
class LichSuHoatDongServiceImpl implements LichSuHoatDongService {
	
	@Autowired
	LichSuHoatDongRepo lichSuHoatDongRepo;

	@Override
	public ResponseDTO<PageDTO<List<LichSuHoatDong>>> search(SearchLichSuHoatDongDTO searchLichSuHoatDongDTO) {
		Sort sortBy = Sort.by("createdAt").descending();

		if (StringUtils.hasText(searchLichSuHoatDongDTO.getSortedField())) {
			sortBy = Sort.by(searchLichSuHoatDongDTO.getSortedField()).ascending();
		}

		if (searchLichSuHoatDongDTO.getCurrentPage() == null) {
			searchLichSuHoatDongDTO.setCurrentPage(0);
		}

		if (searchLichSuHoatDongDTO.getSize() == null) {
			searchLichSuHoatDongDTO.setSize(20);
		}

		if (searchLichSuHoatDongDTO.getNgayBatDau() == null) {
			Date ngayBatDau = Date.from(LocalDate.now().atStartOfDay(ZoneId.systemDefault()).toInstant());
			System.out.println(ngayBatDau);
			searchLichSuHoatDongDTO.setNgayBatDau(ngayBatDau);
		}
		
		if (searchLichSuHoatDongDTO.getNgayKetThuc() == null) {
			Date ngayKetThuc = Date.from(LocalDate.now().plusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant());
			System.out.println(ngayKetThuc);
			searchLichSuHoatDongDTO.setNgayKetThuc(ngayKetThuc);
		}
		
		PageRequest pageRequest = PageRequest.of(searchLichSuHoatDongDTO.getCurrentPage(), searchLichSuHoatDongDTO.getSize(), sortBy);
		Page<LichSuHoatDong> page = lichSuHoatDongRepo.search(searchLichSuHoatDongDTO.getNgayBatDau(), searchLichSuHoatDongDTO.getNgayKetThuc(), pageRequest);

		PageDTO<List<LichSuHoatDong>> pageDTO = new PageDTO<>();
		pageDTO.setTotalElements(page.getTotalElements());
		pageDTO.setTotalPages(page.getTotalPages());

		List<LichSuHoatDong> lichSuHoatDongs = page.getContent();

		pageDTO.setData(lichSuHoatDongs);

		return ResponseDTO.<PageDTO<List<LichSuHoatDong>>>builder().status(200).msg("Thanh công").data(pageDTO).build();
	}
	

	
}