package com.example.hieuthuoc.dto;

import lombok.Data;

@Data
public class ChiTietGioHangDTO {
    private Integer id;
    private Integer gioHangId; // Chỉ lấy ID của GioHang
    private Integer thuocId;   // Chỉ lấy ID của Thuoc
    private Integer soLuong;
    private Double donGia;
}
