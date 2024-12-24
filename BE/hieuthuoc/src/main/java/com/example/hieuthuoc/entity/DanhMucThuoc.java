package com.example.hieuthuoc.entity;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "danh_muc_thuoc")
public class DanhMucThuoc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String tenDanhMuc;
    private String moTa;
    
    @OneToMany(mappedBy = "danhMucThuoc", fetch = FetchType.LAZY)
    private List<LoaiThuoc> loaiThuocs;

}
