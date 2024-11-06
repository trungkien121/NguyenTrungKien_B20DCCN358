import { WeekDay } from "@angular/common";

export class Customer {
    id?: number;                     // Khóa chính, định danh duy nhất cho mỗi khách hàng
    tenDangNhap?: string;            // Tên đăng nhập duy nhất của khách hàng             
    hoTen?: string;                  // Họ và tên của khách hàng
    email?: string;                  // Địa chỉ email của khách hàng
    diaChi?: string;                 // Địa chỉ của khách hàng
    soDienThoai?: string;            // Số điện thoại của khách hàng
    trangThai?: boolean;             // Trạng thái hoạt động của khách hàng, mặc định là true
    ngayTao?: Date;                  // Ngày tạo tài khoản của khách hàng, mặc định là ngày hiện tại
}
  
