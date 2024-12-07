package com.example.hieuthuoc.dto;

import lombok.Data;

@Data
public class DanhGiaDTO {
    private Integer id;
    private Integer thuocId;      // Chỉ lấy ID của Thuoc
    private Integer nguoiDungId;  // Chỉ lấy ID của NguoiDung
    private Integer danhGiaGocId;  // Chỉ lấy ID của DanhGia gốc
    private Integer diemSo;
    private String danhGia;
}
