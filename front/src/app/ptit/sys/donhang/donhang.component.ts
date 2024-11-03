import { Component, OnInit } from "@angular/core";
import { OptionSelect } from "src/app/_model/common/Option";
import { SearchModel } from "src/app/_model/common/Search";
import { Donhang } from "src/app/_model/donhang";


@Component({
  selector: "app-ncc",
  templateUrl: "./donhang.component.html",
  // styleUrls: ["./customer.component.css"],
})
export class DonHangComponent implements OnInit {
  donhang: Donhang[] = [];
  modelSearch: SearchModel = {};
  optionLabel: string = "";

  statusOptions: OptionSelect[] = [];
  visibilityOptions: OptionSelect[] = [];
  categoryOption: OptionSelect[] = [];

  ngOnInit(): void {
    this.donhang = [
        {
            id: 1,
            khachHangId: '1',
            tenKhachHang: 'Nguyễn Văn A',
            soDienThoai: '0123456789',
            diaChi: '123 Đường ABC, Quận X',
            email: 'nguyenvana@example.com',
            ngayLap: new Date('2024-11-03'),
            tongTien: 250000.00,
            trangThaiGiaoHang: 'Đang xử lý',
            ngayGiao: new Date('2024-11-05')
        },
        {
            id: 2,
            khachHangId: null,  
            tenKhachHang: 'Trần Thị B',
            soDienThoai: '0987654321',
            diaChi: '456 Đường XYZ, Quận Y',
            email: 'tranthib@example.com',
            ngayLap: new Date('2024-10-15'),
            tongTien: 150000.00,
            trangThaiGiaoHang: 'Đã giao',
            ngayGiao: new Date('2024-10-17')
        },
        {
            id: 3,
            khachHangId: '102',
            tenKhachHang: 'Lê Văn C',
            soDienThoai: '0912345678',
            diaChi: '789 Đường LMN, Quận Z',
            email: 'levanc@example.com',
            ngayLap: new Date('2024-09-20'),
            tongTien: 300000.00,
            trangThaiGiaoHang: 'Đang giao',
            ngayGiao: new Date('2024-09-22')
        },
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


}
