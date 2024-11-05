package com.example.hieuthuoc.dto;

import lombok.Data;

@Data
public class ChiTietChucNangDTO {
    private Integer id;
    private Integer nhomQuyenId;  // Chỉ lấy ID của NhomQuyen
    private Integer chucNangId;    // Chỉ lấy ID của ChucNang
}
