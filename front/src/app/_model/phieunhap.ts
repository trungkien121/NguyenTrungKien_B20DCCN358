import { NguoiDung } from "./auth/nguoidung";
import { ChiTietPhieuNhap } from "./chitietphieunhap";
import { NhaCungCap } from "./ncc";

export class PhieuNhap {
  id?: string;
  ngayNhap?: string;
  tongTien?: string;
  nguoiDungId?: string;
  nguoiDung?: NguoiDung;
  nhaCungCapId?: string;
  nhaCungCap?: NhaCungCap;
  createdAt?: string;
  updatedAt?: string;

  chiTietPhieuNhaps?: ChiTietPhieuNhap[];
}
