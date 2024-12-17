import { NguoiDung } from "./auth/nguoidung";

export class ThongBao {
  id?: string;
  loaiThongBao?: string;
  ngayTao?: Date;
  noiDung?: string;
  tieuDe?: string;
  trangThai?: boolean;
  nguoiDungId?: string;
  createAt?: Date;
  updatedAt?: Date;
  hinhAnh?: string;
  linkLienKet?: string;
  createdAt?: string;

  nguoiNhan?: NguoiDung;
}
