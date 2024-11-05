package com.example.hieuthuoc.dto;

import lombok.Data;

@Data
public class DoiTuongSdThuocDTO {
    private Integer id;
    private Integer thuocId; // ID của thuốc
    private Integer doiTuongId; // ID của đối tượng
}
