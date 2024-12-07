package com.example.hieuthuoc.dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

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
    private Boolean trangThai = true;
    
    private String matKhauMoi;
    private MultipartFile file;

	private List<NhomQuyenDTO> nhomQuyens;
    // Có thể thêm các trường khác nếu cần
}
