import { Quyen } from "./quyen";

export class NguoiDung {
  id?: string;
  tenDangNhap?: string;
  matKhau?: string;
  hoTen?: string;
  ngayTao?: Date;
  email?: string;
  soDienThoai?: string;
  trangThai?: string;
  diaChi?: string;
  nhomQuyens?: Quyen[];

  file?: File;
  avatar?: string;
  matKhauMoi?: string;
}
