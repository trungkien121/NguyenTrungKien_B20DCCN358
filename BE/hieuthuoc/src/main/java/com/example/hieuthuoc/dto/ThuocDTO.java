package com.example.hieuthuoc.dto;

import java.util.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class ThuocDTO {
	private Integer id;
	private String tenThuoc;
	private String maThuoc;
	private String maVach;

	private Integer loaiThuocId; // Chỉ lưu trữ ID thay vì toàn bộ đối tượng LoaiThuoc
	private Integer nhaSanXuatId; // Chỉ lưu trữ ID thay vì toàn bộ đối tượng NhaSanXuat

	private String donVi;
	private String cheBao;
	private String quyCach;
	private String soDangKy;
	private Date hanSuDung;
	private Double giaNhap;
	private Double giaBan;
	private Integer soLuongTon;
	private Integer nguongCanhBao;
	private String congDung;
	private String chiDinh;
	private String chongChiDinh;
	private String huongDanSuDung;
	private String moTaNgan;
	private String avatar;
	private Boolean trangThai = true;
	private String ghiChu;

	private List<DoiTuongDTO> doiTuongs;
	private List<ThanhPhanThuocDTO> thanhPhanThuocs;

	private MultipartFile file;
}
