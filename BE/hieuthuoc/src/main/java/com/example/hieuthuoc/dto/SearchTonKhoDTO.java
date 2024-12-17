package com.example.hieuthuoc.dto;

import lombok.Data;

@Data
public class SearchTonKhoDTO {
    private String tenThuoc;
    private String soLo;
    private String tenNhaSanXuat;
    
	private Integer currentPage;
	private Integer size;
	private String sortedField;
}
