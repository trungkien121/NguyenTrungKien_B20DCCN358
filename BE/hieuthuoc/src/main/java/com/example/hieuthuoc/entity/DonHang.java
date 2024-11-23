package com.example.hieuthuoc.entity;

import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "don_hang")
public class DonHang {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "khach_hang_id")
	private NguoiDung khachHang;

	@ManyToOne
	@JoinColumn(name = "nguoi_dung_id")
	private NguoiDung nguoiDung;

	private String tenKhachHang;
	private String soDienThoai;
	private String diaChi;
	private String email;
	private Date ngayLap;
	private Double tongTien;
	private Date ngayGiao;
	
	@OneToMany(mappedBy = "donHang", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ChiTietDonHang> chiTietDonHangs;
	
    @Enumerated(EnumType.STRING)
    private TrangThaiGiaoHang trangThaiGiaoHang;

	public enum TrangThaiGiaoHang {
		DANG_XU_LY, DANG_GIAO, DA_GIAO, DA_HUY, TRA_HANG,
	}


}
