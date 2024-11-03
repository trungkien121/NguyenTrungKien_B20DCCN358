import { WeekDay } from "@angular/common";

export class Donhang {
    id?: number;                              
    khachHangId?: String |null;                         
    tenKhachHang?: string;                  
    soDienThoai?: string;                   
    diaChi?: string;                         
    email?: string;                          
    ngayLap?: Date;                          
    tongTien?: number;                       
    trangThaiGiaoHang?: 'Đang xử lý' | 'Đang giao' | 'Đã giao' | 'Đã hủy' | 'Trả hàng'; 
    ngayGiao?: Date;                         
}