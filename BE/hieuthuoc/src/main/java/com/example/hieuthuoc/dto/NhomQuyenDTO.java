package com.example.hieuthuoc.dto;

import java.util.List;

import lombok.Data;

@Data
public class NhomQuyenDTO {
    private Integer id;
    private String tenNhomQuyen;
    private String moTa;

    private List<ChucNangDTO> chucNangs;

    // Có thể thêm các trường khác nếu cần
}
