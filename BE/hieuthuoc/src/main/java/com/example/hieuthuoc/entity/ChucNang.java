package com.example.hieuthuoc.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "chuc_nang")
public class ChucNang {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "ten_chuc_nang", nullable = false)
    private String tenChucNang;
    
    @Column(name = "hanh_dong")
    private String hanhDong;

    @Column(name = "mo_ta")
    private String moTa;
}
