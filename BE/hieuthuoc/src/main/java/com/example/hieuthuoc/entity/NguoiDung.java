package com.example.hieuthuoc.entity;

import java.util.List;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
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
@Table(name = "nguoi_dung")
@EntityListeners(AuditingEntityListener.class)
@EqualsAndHashCode(callSuper = true)
public class NguoiDung extends TimeAuditable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String tenDangNhap;
    private String matKhau;
    private String hoTen;
    private String email;
    private String diaChi;
    private String soDienThoai;
    private String avatar;
    private Boolean trangThai = true;
    
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "chi_tiet_nhom_quyen", 
	           joinColumns = @JoinColumn(name="nguoi_dung_id"), 
	           inverseJoinColumns = @JoinColumn(name="nhom_quyen_id"))
	private List<NhomQuyen> nhomQuyens;
	
	

}