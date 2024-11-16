package com.example.hieuthuoc.dto;

import lombok.Data;

@Data
public class ChiTietDonHangDTO {
    private Integer id;
    private DonHangDTO donHang; // Chỉ lấy ID của DonHang
    private ThuocDTO thuoc;   // Chỉ lấy ID của Thuoc
    private Integer soLuong;
    private Double donGia;
}
