import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonConstant } from "src/app/_constant/common.constants";
import { SearchModel } from "src/app/_model/common/Search";
import { LoaiThuoc } from "src/app/_model/loaithuoc";
import { Thuoc } from "src/app/_model/thuoc";
import { LoaithuocService } from "src/app/_service/loaithuoc.service";
import { ThuocService } from "src/app/_service/thuoc.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  productLst: Thuoc[] = [];
  loaithuocLst: LoaiThuoc[] = [];

  modelSearch: SearchModel = {
    keyWord: "",
    id: 0,
    currentPage: 0,
    size: 10,
    sortedField: "",
    loaiThuoc: "",
  };

  totalRows: number = 0;

  constructor(
    private thuocService: ThuocService,
    private loaithuocService: LoaithuocService,
    private router: Router
  ) {}

  onLoaiThuocChange(value: string) {
    this.modelSearch.loaiThuoc = value;
  }

  ngOnInit() {
    this.getData();
  }

  search() {
    this.getThuoc();
  }
  getData() {
    this.getThuoc();

    this.getLoaiThuoc();
  }

  getLoaiThuoc() {
    this.loaithuocService.getLoaiThuocLst().subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        this.loaithuocLst = res.data;

        if (this.loaithuocLst.length > 0)
          this.modelSearch.loaiThuoc = this.loaithuocLst[0].tenLoai;
      }
    });
  }

  getThuoc() {
    this.thuocService.getProductLst(this.modelSearch).subscribe((res) => {
      // if (res.status == CommonConstant.STATUS_OK_200) {
      this.productLst = res.data.data;
      this.totalRows = res.data.totalElements;
      // }
    });
  }

  showDetail(thuoc: Thuoc) {
    this.router.navigate([`/thuoc-chitiet/${thuoc.id}`]);
  }
}
