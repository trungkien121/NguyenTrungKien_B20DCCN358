import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonConstant } from "src/app/_constant/common.constants";
import { ToastrService } from "ngx-toastr";
import { DonHang } from "src/app/_model/hoadon";
import { ChiTietDonHang } from "src/app/_model/chitietdonhang";
import { TrangThaiGiaoHang } from "src/app/_constant/trangthaigioahang.constant";
import { DonhangService } from "src/app/_service/donhang.service";
import { SearchModel } from "src/app/_model/common/Search";
import { OptionSelect } from "src/app/_model/common/Option";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: "app-chitiet-donhang",
  templateUrl: "./chitiet-donhang.component.html",
  providers: [ConfirmationService, MessageService],
})
export class ChiTietDonHangComponent implements OnInit {
  TrangThaiGiaoHang = TrangThaiGiaoHang;

  donhang: DonHang = {};

  modelSearch: SearchModel = {
    keyWord: "",
    id: 0,
    currentPage: 0,
    size: 100,
    sortedField: "",
  };

  statusOptions: any = {
    name: "",
    value: true,
  };
  categoryOption: OptionSelect[] = [];
  displayDialog: boolean = false;

  tongTien: number = 0;

  constructor(
    private donHangService: DonhangService,
    private toastService: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  handleCancel(displayDialog: boolean) {
    this.displayDialog = displayDialog;
    // this.courseNew = {};
  }

  preSave() {
    if (this.donhang.khachHang) {
      this.donhang.khachHangId = this.donhang.khachHang.id;
    }

    this.donhang.chiTietDonHangs?.forEach((item: ChiTietDonHang) => {
      item.thuocId = item.thuoc?.id;
    });
  }

  xacNhanDonHang() {
    this.preSave();
    this.donhang.trangThaiGiaoHang = TrangThaiGiaoHang.DANG_GIAO;

    this.updateDonHang();
  }

  huyDonHang() {
    this.preSave();
    this.donhang.trangThaiGiaoHang = TrangThaiGiaoHang.DA_HUY;

    this.updateDonHang();
  }

  daNhanHang() {
    this.preSave();
    this.donhang.trangThaiGiaoHang = TrangThaiGiaoHang.DA_GIAO;

    this.updateDonHang();
  }

  updateDonHang() {
    this.donHangService
      .changTrangThaiGiaoHang(this.donhang)
      .subscribe((resp) => {
        if (resp.status == CommonConstant.STATUS_OK_200) {
          this.toastService.success("Cập nhật thành công");
          this.router.navigate(["/sys/donhang"]);
        } else if (resp.status == CommonConstant.STATUS_OK_409) {
          this.toastService.error(resp.msg);
        } else {
          this.toastService.error("Cập nhật thất bại");
        }
      });
  }

  getDonHangByParam() {
    this.route.queryParams.subscribe(async (params) => {
      this.donhang.id = this.route.snapshot.paramMap.get("id") || "";
      if (this.donhang.id) {
        this.getDonHangById(this.donhang.id);
      }
    });
  }

  getDonHangById(id: string) {
    this.donHangService.get(id).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        this.donhang = res.data;

        if (this.donhang.chiTietDonHangs) {
          this.donhang.chiTietDonHangs.forEach((item: ChiTietDonHang) => {
            this.tongTien += (item.soLuong || 0) * (item.donGia || 0);
          });
        }
      }
    });
  }

  ngOnInit() {
    this.getDonHangByParam();

    this.statusOptions = [
      {
        name: "Đang bán",
        value: true,
      },
      {
        name: "Ngừng bán",
        value: false,
      },
    ];
  }

  search() {}
}
