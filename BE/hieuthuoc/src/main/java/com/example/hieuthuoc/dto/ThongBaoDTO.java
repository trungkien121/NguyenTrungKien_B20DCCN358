package com.example.hieuthuoc.dto;

import java.util.List;

import lombok.Data;

@Data
public class ThongBaoDTO {
    private Integer id;
    private String tieuDe;
    private String noiDung;
    private String hinhAnh; // Đường dẫn hình ảnh minh họa
    private String linkLienKet; // Link liên kết
    private String loaiThongBao;
    private List<Integer> nguoiDungId; // Chỉ số ID của người dùng
    private Boolean trangThai = false; // Trạng thái đọc/không đọc
}
