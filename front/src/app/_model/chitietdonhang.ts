import { Thuoc } from "./thuoc";

export class ChiTietDonHang {
  id?: string;
  donGia?: number;
  soLuong?: number;
  thuocId?: string;
  donhangId?: string;

  thuoc?: Thuoc;
}
