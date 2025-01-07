export class SearchModel {
  keyWord?: string;
  currentPage?: number;
  size?: number;
  id?: number;
  sortedField?: string;
  tenLoai?: string = "";

  loaiThuoc?: string;
  tenDoiTuong?: string | null;
  nhaSanXuat?: string | null;
  maxGiaBan?: number | null;
  minGiaBan?: number | null;
}
