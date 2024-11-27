package com.example.hieuthuoc.dto;

import java.util.Date;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class ThuocDTO {
    private Integer id;
    private String tenThuoc;
    private String maThuoc;
    private String maVach;
    
    private Integer loaiThuocId;       // Chỉ lưu trữ ID thay vì toàn bộ đối tượng LoaiThuoc
    private Integer nhaSanXuatId;      // Chỉ lưu trữ ID thay vì toàn bộ đối tượng NhaSanXuat
    private Integer danhMucThuocId;    // Chỉ lưu trữ ID thay vì toàn bộ đối tượng DanhMucThuoc

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
    private Boolean trangThai;
    private String ghiChu;
    
    private String avatar;
    
    private MultipartFile file;
}
