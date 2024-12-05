import { PhuongThucThanhToan } from "../_constant/phuongthucthanhtoan.constant";
import { TrangThaiGiaoHang } from "../_constant/trangthaigioahang.constant";
import { TrangThaiThanhToan } from "../_constant/trangthaithanhtoan.constant";
import { NguoiDung } from "./auth/nguoidung";
import { ChiTietDonHang } from "./chitietdonhang";

export class DonHang {
  createdAt?: Date;
  updateAt?: Date;
  id?: string;
  khachHangId?: string;
  khachHang?: NguoiDung;
  nguoiDung?: NguoiDung;
  tenKhachHang?: string;
  soDienThoai?: string;
  diaChi?: string;
  email?: string;
  ngayLap?: Date;
  ngayGiao?: Date;
  chiTietDonHangs?: ChiTietDonHang[];
  trangThaiGiaoHang?: TrangThaiGiaoHang;
  phuongThucThanhToan?: PhuongThucThanhToan;
  trangThaiThanhToan?: TrangThaiThanhToan;
}
