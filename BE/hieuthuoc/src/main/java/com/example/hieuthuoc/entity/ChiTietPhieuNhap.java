package com.example.hieuthuoc.entity;

import java.util.Date;

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
@Table(name = "chi_tiet_phieu_nhap")
public class ChiTietPhieuNhap {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "phieu_nhap_id")
    private PhieuNhap phieuNhap;

    @ManyToOne
    @JoinColumn(name = "thuoc_id")
    private Thuoc thuoc;

    private Date hanSuDung;
    private Integer soLuong;
    private Double donGia;
    

    // getters and setters
}
