package com.example.hieuthuoc.entity;

import java.util.List;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "thong_bao")
@EntityListeners(AuditingEntityListener.class)
@EqualsAndHashCode(callSuper = true)
public class ThongBao extends TimeAuditable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String tieuDe;
	
	@Column(columnDefinition = "TEXT")
	private String noiDung;
	
	private String hinhAnh; // Đường dẫn hình ảnh minh họa
	private String linkLienKet; // Link liên kết
	
	@Enumerated(EnumType.STRING)
	private LoaiThongBao loaiThongBao;

	private Boolean trangThai = false; // Trạng thái đọc/không đọc

	@ManyToMany(fetch = FetchType.EAGER, cascade = { CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST,
			CascadeType.REFRESH })
	@JoinTable(name = "nguoi_nhan_thong_bao", joinColumns = @JoinColumn(name = "thong_bao_id"), inverseJoinColumns = @JoinColumn(name = "nguoi_dung_id"))
	private List<NguoiDung> nguoiNhan; // Danh sách người nhận

	public enum LoaiThongBao {
		HE_THONG, // Thông báo hệ thống
		CA_NHAN, // Thông báo cá nhân
		GIAO_DICH, // Thông báo giao dịch
		SU_KIEN, // Thông báo sự kiện
		KHUYEN_MAI, // Thông báo khuyến mãi
		CANH_BAO, // Thông báo cảnh báo
		TAI_KHOAN // Thông báo liên quan tài khoản
	}
}
