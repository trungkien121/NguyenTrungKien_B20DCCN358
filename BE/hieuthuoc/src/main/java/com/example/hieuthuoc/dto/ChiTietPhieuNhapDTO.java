package com.example.hieuthuoc.dto;

import lombok.Data;

@Data
public class ChiTietPhieuNhapDTO {
    private Integer id;
    private Integer phieuNhapId; // Chỉ lấy ID của PhieuNhap
    private Integer thuocId;      // Chỉ lấy ID của Thuoc
    private Integer soLuong;
    private Double donGia;
}
