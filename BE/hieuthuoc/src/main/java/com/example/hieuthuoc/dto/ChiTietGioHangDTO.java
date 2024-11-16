package com.example.hieuthuoc.dto;

import lombok.Data;

@Data
public class ChiTietGioHangDTO {
    private Integer id;
    private GioHangDTO gioHang; // Chỉ lấy ID của GioHang
    private ThuocDTO thuoc;   // Chỉ lấy ID của Thuoc
    private Integer soLuong;
    private Double donGia;
}
