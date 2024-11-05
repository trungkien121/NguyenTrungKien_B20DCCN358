package com.example.hieuthuoc.entity;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "nguoi_dung")
public class NguoiDung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String tenDangNhap;
    private String matKhau;
    private String hoTen;
    private String email;
    private String diaChi;
    private String soDienThoai;
    private Boolean trangThai = true;
    private Date ngayTao;
    
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "chi_tiet_nhom_quyen", 
	           joinColumns = @JoinColumn(name="nguoi_dung_id"), 
	           inverseJoinColumns = @JoinColumn(name="nhom_quyen_id"))
	private List<NhomQuyen> nhomQuyens;
	
	

}