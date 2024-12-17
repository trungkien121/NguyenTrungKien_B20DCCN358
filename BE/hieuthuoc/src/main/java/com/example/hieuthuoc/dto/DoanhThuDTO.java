package com.example.hieuthuoc.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DoanhThuDTO {
	private Integer thoiGian;
    private Double tongDoanhThu;
    private Long tongDonHang;
    private Long tongDonHangTraLai;
}
