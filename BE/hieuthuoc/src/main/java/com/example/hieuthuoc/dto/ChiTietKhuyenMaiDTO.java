package com.example.hieuthuoc.dto;

import lombok.Data;

@Data
public class ChiTietKhuyenMaiDTO {
    private Integer id;
    private Integer khuyenMaiId; // Chỉ lấy ID của KhuyenMai
    private Integer thuocId;     // Chỉ lấy ID của Thuoc
    private Double giamGia;
}
