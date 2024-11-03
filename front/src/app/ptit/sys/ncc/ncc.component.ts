import { Component, OnInit } from "@angular/core";
import { OptionSelect } from "src/app/_model/common/Option";
import { SearchModel } from "src/app/_model/common/Search";
import { Ncc } from "src/app/_model/ncc";


@Component({
  selector: "app-ncc",
  templateUrl: "./ncc.component.html",
  // styleUrls: ["./customer.component.css"],
})
export class NCCComponent implements OnInit {
  ncc: Ncc[] = [];
  modelSearch: SearchModel = {};
  optionLabel: string = "";

  statusOptions: OptionSelect[] = [];
  visibilityOptions: OptionSelect[] = [];
  categoryOption: OptionSelect[] = [];

  ngOnInit(): void {
    this.ncc = [
      {
        id: 1,
        tenNhaCungCap: 'Công Ty Dược Phẩm ABC',
        diaChi: '123 Đường A, Quận X',
        soDienThoai: '0123456789',
        email: 'contact@abcpharma.com'
      },
      {
        id: 2,
        tenNhaCungCap: 'Nhà Cung Cấp Y Dược XYZ',
        diaChi: '456 Đường B, Quận Y',
        soDienThoai: '0987654321',
        email: 'info@xyzsupplier.com'
      },
      {
        id: 3,
        tenNhaCungCap: 'Dược Phẩm Quốc Tế PQR',
        diaChi: '789 Đường C, Quận Z',
        soDienThoai: '0912345678',
        email: 'support@pqrinternational.com'
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
