package com.example.hieuthuoc.dto;

import java.util.Date;
import lombok.Data;

@Data
public class HoaDonDTO {
    private Integer id;
    private Integer donHangId; // ID của đơn hàng
    private Integer khachHangId; // ID của khách hàng
    private Integer nguoiDungId; // ID của người dùng
    private Date ngayLap;
    private Double tongTien;
    private Double tienThue;
    private Double giamGia;
    private Double tongTienThanhToan;
    private String phuongThucThanhToan; // Sử dụng String cho enum
    private String trangThaiThanhToan; // Sử dụng String cho enum
    private Date ngayThanhToan;
    private String ghiChu;

    // Có thể thêm các trường khác nếu cần
}
