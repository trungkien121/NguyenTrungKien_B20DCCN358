package com.example.hieuthuoc.entity;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
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
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "don_hang")
@EntityListeners(AuditingEntityListener.class)
@EqualsAndHashCode(callSuper = true)
public class DonHang extends TimeAuditable{
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

	private Double giamGia;
	private Double tongTien;
	
	private Date ngayGiao;
	
	@OneToMany(mappedBy = "donHang", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ChiTietDonHang> chiTietDonHangs;
	
	
    @Enumerated(EnumType.STRING)
    private TrangThaiGiaoHang trangThaiGiaoHang;
    
    @Enumerated(EnumType.STRING)
    private PhuongThucThanhToan phuongThucThanhToan;
    
    @Enumerated(EnumType.STRING)
    private TrangThaiThanhToan trangThaiThanhToan;

	public enum TrangThaiGiaoHang {
		DANG_XU_LY, DANG_GIAO, DA_GIAO, DA_HUY, TRA_HANG,
	}

	public enum PhuongThucThanhToan {
		TIEN_MAT, CHUYEN_KHOAN, THE_NGAN_HANG, VI_DIEN_TU,
	}

	public enum TrangThaiThanhToan {
		CHUA_THANH_TOAN, DA_THANH_TOAN, THANH_TOAN_MOT_PHAN
	}


}
