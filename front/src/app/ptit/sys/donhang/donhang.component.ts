import { TrangThaiGiaoHang } from "./../../../_constant/trangthaigioahang.constant";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ConfirmationService, MessageService } from "primeng/api";
import { CommonConstant } from "src/app/_constant/common.constants";
import { OptionSelect } from "src/app/_model/common/Option";
import { SearchModel } from "src/app/_model/common/Search";
import { Donhang } from "src/app/_model/donhang";
import { DonhangService } from "src/app/_service/donhang.service";

@Component({
  selector: "app-donhang",
  templateUrl: "./donhang.component.html",
  providers: [ConfirmationService, MessageService],
})
export class DonHangComponent implements OnInit {
  TrangThaiGiaoHang = TrangThaiGiaoHang;

  donhangLst: Donhang[] = [];
  modelSearch: SearchModel = {
    keyWord: "",
    id: 0,
    currentPage: 0,
    size: 10,
    sortedField: "",
  };
  optionLabel: string = "";

  statusOptions: OptionSelect[] = [];
  visibilityOptions: OptionSelect[] = [];
  categoryOption: OptionSelect[] = [];

  totalRow: number = 0;

  constructor(
    private donhangService: DonhangService,
    private toastService: ToastrService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.donhangService.getLst(this.modelSearch).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        this.donhangLst = res.data.data;
        this.totalRow = res.data.totalElements;
      }
    });
  }
  onStatusChange(newStatus: string) {
    // this.modelSearch.statusSearch = newStatus;
  }

  onVisibilityChange(newStatus: string) {}

  onCategoryChange(newCategory: string) {
    // this.modelSearch.categorySearch = newCategory;
  }

  preUpdate(order: Donhang) {
    this.router.navigate([`/sys/chitiet-donhang/${order.id}`]);
  }
}
