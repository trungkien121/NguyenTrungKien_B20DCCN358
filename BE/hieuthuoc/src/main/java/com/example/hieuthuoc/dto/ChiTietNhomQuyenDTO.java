package com.example.hieuthuoc.dto;

import lombok.Data;

@Data
public class ChiTietNhomQuyenDTO {
    private Integer id;
    private NguoiDungDTO nguoiDung;  // Chỉ lấy ID của NguoiDung
    private NhomQuyenDTO nhomQuyen;  // Chỉ lấy ID của NhomQuyen
}
