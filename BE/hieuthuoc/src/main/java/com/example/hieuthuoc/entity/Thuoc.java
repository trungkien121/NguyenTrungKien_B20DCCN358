package com.example.hieuthuoc.entity;

import java.util.Date;

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
@Table(name = "thuoc")
public class Thuoc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    private String tenThuoc;
    private String maThuoc;
    private String maVach;
    
    @ManyToOne
    @JoinColumn(name = "loai_thuoc_id")
    private LoaiThuoc loaiThuoc;

    @ManyToOne
    @JoinColumn(name = "nha_san_xuat_id")
    private NhaSanXuat nhaSanXuat;

    @ManyToOne
    @JoinColumn(name = "danh_muc_thuoc_id")
    private DanhMucThuoc danhMucThuoc;

    private String donVi;
    private String cheBao;
    private String quyCach;
    private String soDangKy;
    private Date hanSuDung;
    private Double giaNhap;
    private Double giaBan;
    private Integer soLuongTon;
    private Integer nguongCanhBao;
    private String hinhAnh;
    private String congDung;
    private String chiDinh;
    private String chongChiDinh;
    private String doiTuongSd;
    private String huongDanSuDung;
    private String moTaNgan;
    private Boolean trangThai = true;
    private String ghiChu;

    // getters and setters
}
