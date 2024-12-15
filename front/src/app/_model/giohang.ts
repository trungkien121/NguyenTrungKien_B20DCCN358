import { NguoiDung } from "./auth/nguoidung";
import { GioHangChiTiet } from "./giohangchitiet";

export class GioHang {
  id?: number;
  createAt?: Date;
  updateAt?: Date;
  nguoiDungId?: string;

  khachHang?: NguoiDung;
  chiTietGioHangs?: GioHangChiTiet[];
}
