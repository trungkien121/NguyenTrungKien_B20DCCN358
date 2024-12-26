package com.example.hieuthuoc.entity;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@Table(name = "lich_su_hoat_dong")
@EntityListeners(AuditingEntityListener.class)
@EqualsAndHashCode(callSuper = true)
public class LichSuHoatDong extends TimeAuditable{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private String hanhDong;
	private String moTa;
	
	@ManyToOne
	@JoinColumn(name = "nguoi_dung_id")
	private NguoiDung nguoiDung;
}
