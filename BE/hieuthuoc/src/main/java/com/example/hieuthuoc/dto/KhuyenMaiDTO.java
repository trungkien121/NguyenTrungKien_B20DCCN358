package com.example.hieuthuoc.dto;

import java.util.Date;
import lombok.Data;

@Data
public class KhuyenMaiDTO {
    private Integer id;
    private String tenChuongTrinh;
    private String moTa;
    private Date ngayBatDau;
    private Date ngayKetThuc;
    private Boolean trangThai;

    // Có thể thêm các trường khác nếu cần
}
