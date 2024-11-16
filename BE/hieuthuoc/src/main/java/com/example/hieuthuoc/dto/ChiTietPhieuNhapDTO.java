package com.example.hieuthuoc.dto;

import lombok.Data;

@Data
public class ChiTietPhieuNhapDTO {
    private Integer id;
    private PhieuNhapDTO phieuNhap; // Chỉ lấy ID của PhieuNhap
    private ThuocDTO thuoc;      // Chỉ lấy ID của Thuoc
    private Integer soLuong;
    private Double donGia;
}
