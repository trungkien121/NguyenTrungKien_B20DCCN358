package com.example.hieuthuoc.dto;

import java.util.Date;

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
    private TrangThaiGiaoHangDTO trangThaiGiaoHang; // Enum cho trạng thái giao hàng
    private Date ngayGiao;

    public enum TrangThaiGiaoHangDTO {
        DANG_XU_LY, DANG_GIAO, DA_GIAO, DA_HUY, TRA_HANG
    }
}
