package com.example.hieuthuoc.dto;

import java.util.Date;
import lombok.Data;

@Data
public class GioHangDTO {
    private Integer id;
    private NguoiDungDTO khachHang; // ID của người dùng (khách hàng)
    private Date ngayTao;

    // Có thể thêm các trường khác nếu cần
}
