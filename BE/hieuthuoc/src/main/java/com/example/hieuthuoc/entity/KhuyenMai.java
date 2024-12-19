package com.example.hieuthuoc.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "khuyen_mai")
public class KhuyenMai {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String tenChuongTrinh;
	
	@Column(columnDefinition = "TEXT")
	private String moTa;
	
	private Date ngayBatDau;
	private Date ngayKetThuc;
	private Boolean trangThai;
	// getters and setters
}
