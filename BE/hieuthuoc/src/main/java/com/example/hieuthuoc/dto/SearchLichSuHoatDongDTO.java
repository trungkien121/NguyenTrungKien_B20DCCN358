package com.example.hieuthuoc.dto;

import java.util.Date;

import lombok.Data;

@Data
public class SearchLichSuHoatDongDTO {
    private Date ngayBatDau;
    private Date ngayKetThuc;
    
	private Integer currentPage;
	private Integer size;
	private String sortedField;
}
