package com.example.hieuthuoc.dto;

import java.util.Date;

import lombok.Data;

@Data
public class PhieuNhapDTO {
    private Integer id;
    private Integer nhaCungCapId; // Chỉ số ID của nhà cung cấp
    private Integer nguoiDungId;    // Chỉ số ID của người dùng
    private Date ngayNhap;
    private Double tongTien;

    // Có thể thêm các trường khác nếu cần
}
