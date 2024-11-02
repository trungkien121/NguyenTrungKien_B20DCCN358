import { Component, OnInit } from "@angular/core";
import { OptionSelect } from "src/app/_model/common/Option";
import { SearchModel } from "src/app/_model/common/Search";
import { Product } from "src/app/_model/product";
import { ProductService } from "src/app/_service/product.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  modelSearch: SearchModel = {};
  optionLabel: string = "";

  statusOptions: OptionSelect[] = [];
  visibilityOptions: OptionSelect[] = [];
  categoryOption: OptionSelect[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.statusOptions = [
      {
        name: "Đang bán",
        value: "1",
      },
      {
        name: "Ngừng bán",
        value: "0",
      },
    ];

    this.visibilityOptions = [
      {
        name: "Hiển thị",
        value: "1",
      },
      {
        name: "Không hiển thị",
        value: "0",
      },
    ];

    this.categoryOption = [
      {
        name: "Thuốc về đầu",
        value: "1",
      },
      {
        name: "Thuốc về dạ dày",
        value: "0",
      },
    ];

    this.products = [
      {
        id: "P001",
        tenThuoc: "Thuốc giảm đau",
        maThuoc: "TD001",
        maVach: "1234567890",
        loaiThuocId: "LT01",
        nhaSanXuatId: "NSX01",
        danhMucThuocId: "DM01",
        donVi: "viên",
        cheBao: "Hộp",
        quyCach: "10 viên / vỉ",
        soDangKy: "SD001",
        hanSuDung: new Date("2025-12-31"),
        giaNhap: 2000,
        giaBan: 5000,
        soLuongTon: 100,
        nguongCanhBao: 10,
        hinhAnh: "thuoc-giam-dau.jpg",
        congDung: "Giảm đau nhanh chóng",
        chiDinh: "Dùng khi đau đầu, đau bụng",
        chongChiDinh: "Không dùng cho người mẫn cảm",
        huongDanSuDung: "Uống 1-2 viên mỗi ngày",
        moTaNgan: "Thuốc giảm đau phổ biến",
        trangThai: true,
        ghiChu: "Để nơi khô ráo, tránh ánh sáng",
      },
      {
        id: "P002",
        tenThuoc: "Vitamin C",
        maThuoc: "VT002",
        maVach: "0987654321",
        loaiThuocId: "LT02",
        nhaSanXuatId: "NSX02",
        danhMucThuocId: "DM02",
        donVi: "viên",
        cheBao: "Lọ",
        quyCach: "100 viên / lọ",
        soDangKy: "SD002",
        hanSuDung: new Date("2024-06-30"),
        giaNhap: 1500,
        giaBan: 3000,
        soLuongTon: 200,
        nguongCanhBao: 20,
        hinhAnh: "vitamin-c.jpg",
        congDung: "Bổ sung vitamin C",
        chiDinh: "Dùng cho người thiếu vitamin C",
        chongChiDinh: "Không dùng cho người mẫn cảm với thành phần",
        huongDanSuDung: "Uống 1 viên mỗi ngày",
        moTaNgan: "Vitamin C giúp tăng sức đề kháng",
        trangThai: true,
        ghiChu: "Bảo quản nơi khô ráo, tránh nhiệt độ cao",
      },

    ];
  }

  search() {}

  onStatusChange(newStatus: string) {
    this.modelSearch.statusSearch = newStatus;
  }

  onVisibilityChange(newStatus: string) {
    this.modelSearch.visibilySearch = newStatus;
  }

  onCategoryChange(newCategory: string) {
    this.modelSearch.categorySearch = newCategory;
  }
}
