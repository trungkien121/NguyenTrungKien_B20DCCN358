package com.example.hieuthuoc.dto;

import lombok.Data;

@Data
public class NhaCungCapDTO {
    private Integer id;
    private String maNCC;
    private String tenNhaCungCap;
    private String diaChi;
    private String soDienThoai;
    private String email;

    // Có thể thêm các trường khác nếu cần
}
