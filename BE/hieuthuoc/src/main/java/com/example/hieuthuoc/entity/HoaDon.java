package com.example.hieuthuoc.entity;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "hoa_don")
public class HoaDon {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "don_hang_id")
	private DonHang donHang;

	@ManyToOne
	@JoinColumn(name = "khach_hang_id")
	private NguoiDung khachHang;

	@ManyToOne
	@JoinColumn(name = "nguoi_dung_id")
	private NguoiDung nguoiDung;

	private Date ngayLap;
	private Double tongTien;
	private Double tienThue;
	private Double giamGia;
	private Double tongTienThanhToan;
	private Date ngayThanhToan;
	private String ghiChu;
	 
	
    @Enumerated(EnumType.STRING)
    private PhuongThucThanhToan phuongThucThanhToan;
    
    @Enumerated(EnumType.STRING)
    private TrangThaiThanhToan trangThaiThanhToan;

    
	public enum PhuongThucThanhToan {
		TIEN_MAT, CHUYEN_KHOAN, THE_NGAN_HANG, VI_DIEN_TU,
	}

	public enum TrangThaiThanhToan {
		CHUA_THANH_TOAN, DA_THANH_TOAN, THANH_TOAN_MOT_PHAN
	}


	// getters and setters
}
