package com.example.hieuthuoc.dto;

import lombok.Data;

import java.util.Date;

@Data
public class DanhGiaDTO {
    private Integer id;
    private ThuocDTO thuoc;      // Chỉ lấy ID của Thuoc
    private NguoiDungDTO nguoiDung;  // Chỉ lấy ID của NguoiDung
    private DanhGiaDTO danhGiaGoc;  // Chỉ lấy ID của DanhGia gốc
    private Integer diemSo;
    private String danhGia;
    private Date ngayDanhGia;
}
