package com.example.hieuthuoc.dto;

import lombok.Data;

@Data
public class ChiTietNhomQuyenDTO {
    private Long id;
    private Long nguoiDungId;  // Chỉ lấy ID của NguoiDung
    private Long nhomQuyenId;  // Chỉ lấy ID của NhomQuyen
}
