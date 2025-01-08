import { PhieuNhap } from "./phieunhap";
import { Thuoc } from "./thuoc";

export class TonKho {
  id?: string;
  thuocId?: Thuoc;
  soLo?: String;
  hanSuDUng?: PhieuNhap;
  soLuong?: PhieuNhap;
  viTri?: String;
}
