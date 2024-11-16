package com.example.hieuthuoc.dto;

import lombok.Data;

@Data
public class ChiTietChucNangDTO {
    private Integer id;
    private NhomQuyenDTO nhomQuyen;  // Chỉ lấy ID của NhomQuyen
    private ChucNangDTO chucNang;    // Chỉ lấy ID của ChucNang
}
