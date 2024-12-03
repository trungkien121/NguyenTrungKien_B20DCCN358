package com.example.hieuthuoc.dto;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class DonHangDTO {
    private Integer id;
    private Integer khachHangId; // ID của khách hàng
    private Integer nguoiDungId;  // ID của người dùng
    private String tenKhachHang;
    private String soDienThoai;
    private String diaChi;
    private String email;
    private Date ngayLap;
    private Double tongTien;
    private Date ngayGiao;

    private String trangThaiGiaoHang;
    private String phuongThucThanhToan;
    private String trangThaiThanhToan;
    
    private List<ChiTietDonHangDTO> chiTietDonHangs;

}

