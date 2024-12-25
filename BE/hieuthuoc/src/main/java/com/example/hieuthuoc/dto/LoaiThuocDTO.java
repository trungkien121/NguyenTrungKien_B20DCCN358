package com.example.hieuthuoc.dto;

import lombok.Data;

@Data
public class LoaiThuocDTO {
    private Integer id;
    private String tenLoai;
    private String moTa;
    
    private Integer danhMucThuocId;
    // Có thể thêm các trường khác nếu cần
}
