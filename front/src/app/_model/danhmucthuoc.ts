import { WeekDay } from "@angular/common";
import { LoaiThuoc } from "./loaithuoc";

export class DanhMucThuoc {
  id?: string;
  tenDanhMuc?: string;
  moTa?: string;

  loaiThuocs?: LoaiThuoc[]
}
