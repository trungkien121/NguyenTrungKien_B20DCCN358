package com.example.hieuthuoc.dto;

import java.util.List;

import com.example.hieuthuoc.entity.ChiTietGioHang;

import lombok.Data;

@Data
public class GioHangDTO {
    private Integer id;
    private Integer khachHangId; // ID của người dùng (khách hàng)
    
    List<ChiTietGioHang> chiTietGioHangs;

    // Có thể thêm các trường khác nếu cần
}
