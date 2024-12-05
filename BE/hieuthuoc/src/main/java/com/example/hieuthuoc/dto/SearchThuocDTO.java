package com.example.hieuthuoc.dto;

import lombok.Data;

@Data
public class SearchThuocDTO {
    private String keyWord;
    private String loaiThuoc;
    private String nhaSanXuat;
    private String danhMucThuoc;
    private String tenDoiTuong;
    private Double maxGiaBan;
    
	private Integer currentPage;
	private Integer size;
	private String sortedField;
}
