import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonConstant } from "src/app/_constant/common.constants";
import { SearchModel } from "src/app/_model/common/Search";
import { LoaiThuoc } from "src/app/_model/loaithuoc";
import { Thuoc } from "src/app/_model/thuoc";
import { LoaithuocService } from "src/app/_service/loaithuoc.service";
import { ThuocService } from "src/app/_service/thuoc.service";

@Component({
  selector: "app-thuoc-chitiet",
  templateUrl: "./thuoc-chitiet.component.html",
})
export class ThuocChiTietComponent implements OnInit {
  thuoc: Thuoc = {};
  loaithuocLst: LoaiThuoc[] = [];

  modelSearch: SearchModel = {
    keyWord: "",
    id: 0,
    currentPage: 0,
    size: 10,
    sortedField: "",
  };

  totalRows: number = 0;

  constructor(
    private thuocService: ThuocService,
    private loaithuocService: LoaithuocService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getData();
    this.getThuocByParam();
  }

  getThuocByParam() {
    this.route.queryParams.subscribe(async (params) => {
      this.thuoc.id = this.route.snapshot.paramMap.get("id") || "";
      if (this.thuoc.id) {
        this.getThuocById(this.thuoc.id);
      }
    });
  }

  getThuocById(id: string) {
    this.thuocService.getProduct(id).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        this.thuoc = res.data;
      }
    });
  }

  getData() {
    this.getLoaiThuoc();
  }

  getLoaiThuoc() {
    this.loaithuocService.getLoaiThuocLst().subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        this.loaithuocLst = res.data;
      }
    });
  }

  addProductInCart() {}
}
