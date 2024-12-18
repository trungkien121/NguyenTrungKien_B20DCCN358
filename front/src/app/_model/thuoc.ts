import { DanhMucThuoc } from "./danhmucthuoc";
import { DoiTuong } from "./doituong";
import { LoaiThuoc } from "./loaithuoc";
import { NhaSanXuat } from "./nsx";
import { ThanhPhanThuoc } from "./thanhphanthuoc";

export class Thuoc {
  id?: string;
  tenThuoc?: string;
  maThuoc?: string;
  maVach?: string;
  loaiThuocId?: string;
  nhaSanXuatId?: string;
  danhMucThuocId?: string;
  donVi?: string;
  cheBao?: string;
  quyCach?: string;
  soDangKy?: string;
  hanSuDung?: string;
  giaNhap?: number;
  giaBan?: number;
  soLuongTon?: number;
  nguongCanhBao?: number;
  congDung?: string;
  chiDinh?: string;
  chongChiDinh?: string;
  huongDanSuDung?: string;
  moTaNgan?: string;
  trangThai?: string;
  ghiChu?: string;
  doiTuongSD?: string;

  hinhAnh?: string;
  avatar?: string;
  file?: File;

  loaiThuoc?: LoaiThuoc;
  nhaSanXuat?: NhaSanXuat;
  danhMucThuoc?: DanhMucThuoc;

  doiTuongs?: DoiTuong[];
  thanhPhanThuocs?: ThanhPhanThuoc[];
}
