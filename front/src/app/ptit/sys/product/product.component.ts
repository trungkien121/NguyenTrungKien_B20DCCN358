import { Component, OnInit } from "@angular/core";
import { OptionSelect } from "src/app/_model/common/Option";
import { SearchModel } from "src/app/_model/common/Search";
import { LoaiThuoc } from "src/app/_model/loaithuoc";
import { NhaCungCap } from "src/app/_model/ncc";
import { Thuoc } from "src/app/_model/thuoc";
import { LoaithuocService } from "src/app/_service/loaithuoc.service";
import { ThuocService } from "src/app/_service/thuoc.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent implements OnInit {
  productLst: Thuoc[] = [];
  loaithuocLst: LoaiThuoc[] = [];
  nccLst: NhaCungCap[] = [];

  modelSearch: SearchModel = {};
  optionLabel: string = "";

  statusOptions: OptionSelect[] = [];
  visibilityOptions: OptionSelect[] = [];
  categoryOption: OptionSelect[] = [];

  constructor(
    private thuocService: ThuocService,
    private loaithuocService: LoaithuocService
  ) {}

  ngOnInit() {
    this.thuocService.getProductLst(this.modelSearch).subscribe((res) => {
      this.productLst = res.responseData;
    });

    this.getLoaiThuoc();

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
  }

  getLoaiThuoc() {
    this.loaithuocService.getLoaiThuocLst().subscribe((res) => {
      this.productLst = res.responseData;
    });
  }

  search() {}

  onStatusChange(newStatus: string) {
    // this.modelSearch.statusSearch = newStatus;
  }

  onNCCChange(newStatus: string) {
    // this.modelSearch.visibilySearch = newStatus;
  }

  onCategoryChange(newCategory: string) {
    // this.modelSearch.categorySearch = newCategory;
  }
}
