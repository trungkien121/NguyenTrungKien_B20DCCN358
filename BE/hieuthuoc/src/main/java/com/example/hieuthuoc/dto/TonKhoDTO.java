package com.example.hieuthuoc.dto;

import java.util.Date;

import lombok.Data;

@Data
public class TonKhoDTO {
    private Integer id;
    private Integer thuocId; // ID của thuốc
    private String soLo;
    private Date hanSuDung;
    private Integer soLuong;
    private String viTri;
}
