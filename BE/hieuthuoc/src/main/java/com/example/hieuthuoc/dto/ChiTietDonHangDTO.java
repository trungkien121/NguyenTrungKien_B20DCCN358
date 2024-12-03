package com.example.hieuthuoc.dto;

import lombok.Data;

@Data
public class ChiTietDonHangDTO {
    private Integer id;
    private Integer donHangId; // Chỉ lấy ID của DonHang
    private Integer thuocId;   // Chỉ lấy ID của Thuoc
    private Integer soLuong;
    private Double donGia;
}
