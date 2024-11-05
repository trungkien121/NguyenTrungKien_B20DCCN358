package com.example.hieuthuoc.dto;

import lombok.Data;

@Data
public class ThanhPhanThuocDTO {
    private Integer id;
    private Integer thuocId; // Chỉ số ID của thuốc
    private String tenThanhPhan;
    private String hamLuong;
    private String donVi;

    // Có thể thêm các trường khác nếu cần
}
