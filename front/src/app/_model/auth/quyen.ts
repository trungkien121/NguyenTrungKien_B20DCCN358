import { ChucNang } from "../chucnang";

export class Quyen {
  id: string;
  tenNhomQuyen: string;
  moTa?: string;
  chucNang?: ChucNang[];
  constructor(id: string, tenNhomQuyen: string) {
    this.id = id;
    this.tenNhomQuyen = tenNhomQuyen;
  }
}
