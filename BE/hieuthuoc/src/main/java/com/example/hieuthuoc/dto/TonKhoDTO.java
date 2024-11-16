package com.example.hieuthuoc.dto;

import java.util.Date;

import lombok.Data;

@Data
public class TonKhoDTO {
    private Integer id;
    private ThuocDTO thuoc; // ID của thuốc
    private Date ngayNhapKho;
    private Date hanSuDung;
    private Integer soLuong;
    private String viTri;
}
