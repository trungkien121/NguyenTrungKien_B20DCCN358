package com.example.hieuthuoc.dto;

import java.util.Date;

import lombok.Data;

@Data
public class ChiTietPhieuNhapDTO {
    private Integer id;
    private Integer phieuNhapId; // Chỉ lấy ID của PhieuNhap
    private Integer thuocId;      // Chỉ lấy ID của Thuoc
    private Date hanSuDung;
    private Integer soLuong;
    private Double donGia;
}
