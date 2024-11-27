package com.example.hieuthuoc.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "image_thuoc")
public class ImageThuoc {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id; // Mã ảnh
	
	private String name; // Tên ảnh
	private boolean isThumbnail; // Có phải là thumbnail không
	private String url; // Link hình ảnh
	
	@ManyToOne
	@JoinColumn(name = "thuoc_id")
	private Thuoc thuoc;
}
