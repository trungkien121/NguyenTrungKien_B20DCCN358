package com.example.hieuthuoc.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "chi_tiet_don_hang")
public class ChiTietDonHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "don_hang_id")
    private DonHang donHang;

    @ManyToOne
    @JoinColumn(name = "thuoc_id")
    private Thuoc thuoc;

    private Integer soLuong;
    private Double donGia;

    // getters and setters
}