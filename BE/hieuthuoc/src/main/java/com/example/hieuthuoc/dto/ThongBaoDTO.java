package com.example.hieuthuoc.dto;

import java.util.Date;

import lombok.Data;

@Data
public class ThongBaoDTO {
    private Integer id;
    private String tieuDe;
    private String noiDung;
    private String loaiThongBao;
    private Date ngayTao;
    private Integer nguoiDungId; // Chỉ số ID của người dùng
    private Boolean trangThai; // Trạng thái đọc/không đọc
}
