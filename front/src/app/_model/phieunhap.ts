import { NguoiDung } from "./auth/nguoidung";
import { ChiTietPhieuNhap } from "./chitietphieunhap";
import { NhaCungCap } from "./ncc";

export class PhieuNhap {
  id?: string;
  ngayNhap?: Date;
  tongTien?: string;
  nguoiDungId?: string;
  nguoiDung?: NguoiDung;
  nhaCungCapId?: string;
  nhaCungCap?: NhaCungCap;
  createAt?: Date;
  updatedAt?: Date;

  chiTietPhieuNhaps?: ChiTietPhieuNhap[];
}
