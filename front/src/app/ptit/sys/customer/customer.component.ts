import { Component, OnInit } from "@angular/core";
import { OptionSelect } from "src/app/_model/common/Option";
import { SearchModel } from "src/app/_model/common/Search";
import { Customer } from "src/app/_model/customer";
import { Product } from "src/app/_model/product";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  // styleUrls: ["./customer.component.css"],
})
export class CustomerComponent implements OnInit {
  customer: Customer[] = [];
  modelSearch: SearchModel = {};
  optionLabel: string = "";

  statusOptions: OptionSelect[] = [];
  visibilityOptions: OptionSelect[] = [];
  categoryOption: OptionSelect[] = [];

  ngOnInit(): void {
    this.customer = [
        {
          id: 1,
          tenDangNhap: 'username123',
    
          hoTen: 'Nguyễn Văn A',
          email: 'nguyenvana@example.com',
          diaChi: '123 Đường ABC, Quận X',
          soDienThoai: '0123456789',
          trangThai: true,
          ngayTao: new Date('2024-11-03')
        },
          {
            id: 2,
            tenDangNhap: 'user456',
            hoTen: 'Trần Thị B',
            email: 'tranthib@example.com',
            diaChi: '456 Đường XYZ, Quận Y',
            soDienThoai: '0987654321',
            trangThai: false,
            ngayTao: new Date('2024-10-15')
          },
          {
            id: 3,
            tenDangNhap: 'user789',
            hoTen: 'Lê Văn C',
            email: 'levanc@example.com',
            diaChi: '789 Đường LMN, Quận Z',
            soDienThoai: '0912345678',
            trangThai: true,
            ngayTao: new Date('2024-09-20')
          },
          {
            id: 4,
            tenDangNhap: 'user101',
            hoTen: 'Phạm Thị D',
            email: 'phamthid@example.com',
            diaChi: '101 Đường OPQ, Quận A',
            soDienThoai: '0908765432',
            trangThai: true,
            ngayTao: new Date('2024-11-01')
          },
          {
            id: 5,
            tenDangNhap: 'user202',
            hoTen: 'Ngô Văn E',
            email: 'ngovane@example.com',
            diaChi: '202 Đường RST, Quận B',
            soDienThoai: '0934567890',
            trangThai: false,
            ngayTao: new Date('2024-08-05')
          }
      ];
      
  }
  onStatusChange(newStatus: string) {
    this.modelSearch.statusSearch = newStatus;
  }

  onVisibilityChange(newStatus: string) {
    this.modelSearch.visibilySearch = newStatus;
  }

  onCategoryChange(newCategory: string) {
    this.modelSearch.categorySearch = newCategory;
  }
  search() {
    const searchValue = this.modelSearch?.keySearch?.trim();
    if (searchValue) {
      console.log('Đang tìm kiếm thuốc với từ khóa:', searchValue);
      // Thực hiện logic tìm kiếm ở đây
    } else {
      console.log('Vui lòng nhập tên thuốc để tìm kiếm');
    }
  }

}
