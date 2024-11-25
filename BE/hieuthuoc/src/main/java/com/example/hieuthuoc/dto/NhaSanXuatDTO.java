package com.example.hieuthuoc.dto;

import lombok.Data;

@Data
public class NhaSanXuatDTO {
    private Integer id;
    
    private String maNSX;
    private String tenNhaSanXuat;
    private String nuocSanXuat;
    private String diaChi;
    private String soDienThoai;
    private String email;

    // Có thể thêm các trường khác nếu cần
}
