package com.example.hieuthuoc.dto;

import lombok.Data;

@Data
public class DoiTuongSdThuocDTO {
    private Integer id;
    private ThuocDTO thuoc; // ID của thuốc
    private DoiTuongDTO doiTuong; // ID của đối tượng
}
