import { PhuongThucThanhToan } from "../_constant/phuongthucthanhtoan.constant";
import { TrangThaiGiaoHang } from "../_constant/trangthaigioahang.constant";
import { TrangThaiThanhToan } from "../_constant/trangthaithanhtoan.constant";
import { ChiTietDonHang } from "./chitietdonhang";

export class Donhang {
  id?: number;
  khachHangId?: String | null;
  tenKhachHang?: string;
  soDienThoai?: string;
  diaChi?: string;
  email?: string;
  ngayLap?: Date;
  tongTien?: number;
  chiTietDonHang?: ChiTietDonHang;
  trangThaiGiaoHang?: TrangThaiGiaoHang;
  phuongThucThanhToan?: PhuongThucThanhToan;
  trangThaiThanhToan?: TrangThaiThanhToan;

  chiTietDonHangs?: ChiTietDonHang[];

  ngayGiao?: Date;
}
