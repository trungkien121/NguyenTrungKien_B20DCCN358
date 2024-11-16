package com.example.hieuthuoc.dto;

import lombok.Data;

@Data
public class ChiTietKhuyenMaiDTO {
    private Integer id;
    private KhuyenMaiDTO khuyenMai; // Chỉ lấy ID của KhuyenMai
    private ThuocDTO thuoc;     // Chỉ lấy ID của Thuoc
    private Double giamGia;
}
