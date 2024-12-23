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
import { GioHangChiTiet } from "src/app/_model/giohangchitiet";
import { GioHangService } from "src/app/_service/giohang.service";
import { NguoiDung } from "src/app/_model/auth/nguoidung";

@Component({
  selector: "app-donmua-chitiet",
  templateUrl: "./donmua-chitiet.component.html",
  providers: [ConfirmationService, MessageService],
})
export class DonMuaChiTietComponent implements OnInit {
  TrangThaiGiaoHang = TrangThaiGiaoHang;

  donhang: DonHang = {};

  modelSearch: SearchModel = {
    keyWord: "",
    id: 0,
    currentPage: 0,
    size: 100,
    sortedField: "",
  };

  gioHangLst: GioHangChiTiet[] = [];
  gioHangId: number = 0;

  statusOptions: any = {
    name: "",
    value: true,
  };
  categoryOption: OptionSelect[] = [];
  displayDialog: boolean = false;

  tongTien: number = 0;
  userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  constructor(
    private donHangService: DonhangService,
    private toastService: ToastrService,
    private route: ActivatedRoute,
    private gioHangService: GioHangService,

    private router: Router
  ) {}

  showDetail(thuoc: any) {
    this.router.navigate([`/thuoc-chitiet/${thuoc.id}`]);
  }
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

  clearCart() {
    this.gioHangService.getGH(this.userInfo.id).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        if (res.data.chiTietGioHangs.length > 0) {
          this.gioHangId = res.data.id;
          this.gioHangLst = res.data.chiTietGioHangs;

          this.gioHangLst.forEach((item: GioHangChiTiet) => {
            this.gioHangService.deleteGH(item.id).subscribe((resp) => {
              if (resp.status == CommonConstant.STATUS_OK_200) {
                this.toastService.success("Xóa giỏ hàng thành công");
              } else {
                this.toastService.error("Xóa giỏ hàng thất bại");
              }
            });
          });
        }
      }
    });
  }
}
