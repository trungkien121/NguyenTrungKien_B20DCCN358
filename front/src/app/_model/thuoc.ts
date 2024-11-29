import { DanhMucThuoc } from "./danhmucthuoc";
import { LoaiThuoc } from "./loaithuoc";
import { NhaSanXuat } from "./nsx";

export class Thuoc {
  id?: string;
  tenThuoc?: String;
  maThuoc?: String;
  maVach?: String;
  loaiThuocId?: string;
  nhaSanXuatId?: string;
  danhMucThuocId?: string;
  donVi?: String;
  cheBao?: String;
  quyCach?: String;
  soDangKy?: String;
  hanSuDung?: Date;
  giaNhap?: number;
  giaBan?: number;
  soLuongTon?: number;
  nguongCanhBao?: number;
  congDung?: String;
  chiDinh?: String;
  chongChiDinh?: String;
  huongDanSuDung?: String;
  moTaNgan?: String;
  trangThai?: boolean;
  ghiChu?: String;
  doiTuongSD?: string;

  hinhAnh?: string;
  avatar?: string;
  file?: File;

  loaiThuoc?: LoaiThuoc;
  nhaSanXuat?: NhaSanXuat;
  danhMucThuoc?: DanhMucThuoc;
}
