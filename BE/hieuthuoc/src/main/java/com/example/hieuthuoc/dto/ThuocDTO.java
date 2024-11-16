package com.example.hieuthuoc.dto;

import java.util.Date;
import lombok.Data;

@Data
public class ThuocDTO {
    private Integer id;
    private String tenThuoc;
    private String maThuoc;
    private String maVach;
    
    private LoaiThuocDTO loaiThuoc;       // Chỉ lưu trữ ID thay vì toàn bộ đối tượng LoaiThuoc
    private NhaSanXuatDTO nhaSanXuat;      // Chỉ lưu trữ ID thay vì toàn bộ đối tượng NhaSanXuat
    private NhaCungCapDTO danhMucThuoc;    // Chỉ lưu trữ ID thay vì toàn bộ đối tượng DanhMucThuoc

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
}
