package com.example.hieuthuoc.dto;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class NguoiDungDTO {
    private Integer id;
    private String tenDangNhap;
    private String matKhau; // Bạn có thể xem xét không đưa mật khẩu vào DTO
    private String hoTen;
    private String email;
    private String diaChi;
    private String soDienThoai;
    private Boolean trangThai;
    private Date ngayTao;

	private List<NhomQuyenDTO> nhomQuyens;
    // Có thể thêm các trường khác nếu cần
}
