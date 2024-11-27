import { Component, OnInit } from "@angular/core";
import { CommonConstant } from "src/app/_constant/common.constants";
import { OptionSelect } from "src/app/_model/common/Option";
import { SearchModel } from "src/app/_model/common/Search";
import { LoaiThuoc } from "src/app/_model/loaithuoc";
import { NhaCungCap } from "src/app/_model/ncc";
import { NhaSanXuat } from "src/app/_model/nsx";
import { Thuoc } from "src/app/_model/thuoc";
import { LoaithuocService } from "src/app/_service/loaithuoc.service";
import { NCCService } from "src/app/_service/ncc.service";
import { NSXService } from "src/app/_service/nsx.service";
import { ThuocService } from "src/app/_service/thuoc.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
})
export class ProductComponent implements OnInit {
  productLst: Thuoc[] = [];
  loaithuocLst: LoaiThuoc[] = [];
  nsxLst: NhaSanXuat[] = [];

  modelSearch: SearchModel = {
    keyWord: "",
    id: 0,
    currentPage: 0,
    size: 10,
    sortedField: "",
  };

  statusOptions: OptionSelect[] = [];
  visibilityOptions: OptionSelect[] = [];
  categoryOption: OptionSelect[] = [];

  constructor(
    private thuocService: ThuocService,
    private loaithuocService: LoaithuocService,
    private nsxService: NSXService
  ) {}

  ngOnInit() {
    this.getThuoc();

    this.getLoaiThuoc();

    this.getNSX();

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
  }

  getNSX() {
    this.nsxService.getNSXLst().subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        this.nsxLst = res.data;
      }
    });
  }

  getLoaiThuoc() {
    this.loaithuocService.getLoaiThuocLst().subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        this.loaithuocLst = res.data;
      }
    });
  }

  getThuoc() {
    this.thuocService.getProductLst(this.modelSearch).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        this.productLst = res.data.data;
      }
    });
  }

  search() {}

  onStatusChange(newStatus: string) {
    // this.modelSearch.statusSearch = newStatus;
  }

  onNSXChange(newStatus: string) {
    // this.modelSearch.visibilySearch = newStatus;
  }

  onCategoryChange(newCategory: string) {
    // this.modelSearch.categorySearch = newCategory;
  }
}
