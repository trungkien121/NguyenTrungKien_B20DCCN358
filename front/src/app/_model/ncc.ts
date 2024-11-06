import { WeekDay } from "@angular/common";

export class Ncc {
    id?: number;               // Khóa chính, định danh duy nhất cho mỗi nhà cung cấp
    tenNhaCungCap?: string;    // Tên nhà cung cấp
    diaChi?: string;           // Địa chỉ của nhà cung cấp
    soDienThoai?: string;      // Số điện thoại liên hệ
    email?: string; 
}
  
