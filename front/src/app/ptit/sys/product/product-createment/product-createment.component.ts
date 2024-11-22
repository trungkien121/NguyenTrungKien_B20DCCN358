import { Component, OnInit } from "@angular/core";
import { OptionSelect } from "src/app/_model/common/Option";
import { SearchModel } from "src/app/_model/common/Search";
import { Product } from "src/app/_model/product";
import { ProductService } from "src/app/_service/product.service";

@Component({
  selector: "app-product-createment",
  templateUrl: "./product-createment.component.html",
  styleUrls: ["./product-createment.component.css"],
})
export class ProductCreatementComponent implements OnInit {
  product: Product = {};
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
    this.product = {
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
    };
  }
  search() {}

  onStatusChange(newStatus: string) {
    // this.modelSearch.statusSearch = newStatus;
  }

  onVisibilityChange(newStatus: string) {}

  onCategoryChange(newCategory: string) {
    // this.modelSearch.categorySearch = newCategory;
  }
  imageUrl: string | ArrayBuffer | null = null; // Biến để lưu đường dẫn hình ảnh đã chọn
  files: { name: string; size: number; thumbnail: string; error?: string }[] =
    []; // Danh sách các tệp hình ảnh

  // Hàm xử lý khi hình ảnh được chọn
  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageUrl = e.target.result; // Cập nhật đường dẫn hình ảnh
      };

      reader.readAsDataURL(file); // Đọc tệp hình ảnh
    }
  }

  // Hàm xử lý khi nhiều tệp được chọn từ dropzone
  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.files.push({
            name: file.name,
            size: file.size,
            thumbnail: e.target.result, // Đường dẫn hình ảnh thu nhỏ
          });
        };

        reader.readAsDataURL(file); // Đọc từng tệp hình ảnh
      }
    }
  }

  // Hàm xóa tệp khỏi danh sách
  removeFile(file: { name: string }) {
    this.files = this.files.filter((f) => f.name !== file.name); // Xóa tệp khỏi danh sách
  }
}
