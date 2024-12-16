import { NguoiDung } from "./auth/nguoidung";

export class DanhGia {
  id?: string;
  dangGiaGocId?: string;
  nguoiDungId?: string;
  thuocId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  danhGia?: string;
  diemSo?: number;
  ngayDanhGia?: number;

  nguoiDung?: NguoiDung;
}
