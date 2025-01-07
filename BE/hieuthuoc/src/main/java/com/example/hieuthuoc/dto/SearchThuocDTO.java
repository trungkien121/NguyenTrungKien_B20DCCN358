package com.example.hieuthuoc.dto;

import lombok.Data;

@Data
public class SearchThuocDTO {
    private String keyWord;
    private String loaiThuoc;
    private String nhaSanXuat;
    private String danhMucThuoc;
    private Double minGiaBan;
    private Double maxGiaBan;
    private String tenDoiTuong;
    private Boolean trangThai;
    
	private Integer currentPage;
	private Integer size;
	private String sortedField;
}
