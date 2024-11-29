import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonConstant } from "src/app/_constant/common.constants";
import { NguoiDung } from "src/app/_model/auth/nguoidung";
import { ToastrService } from "ngx-toastr";
import { NguoidungService } from "src/app/_service/auth/nguoidung.service";
import { GioHangService } from "src/app/_service/giohang.service";
import { GioHangChiTiet } from "src/app/_model/giohangchitiet";
import { Cookie } from "ng2-cookies";
import { AuthConstant } from "src/app/_constant/auth.constant";
import { jwtDecode } from "jwt-decode";
import { lastValueFrom } from "rxjs";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
})
export class CheckoutComponent implements OnInit {
  constructor(
    private nguoidungService: NguoidungService,
    private router: Router,
    private toastService: ToastrService,
    private gioHangService: GioHangService,

  ) {}

  userInfo: NguoiDung = {};
  gioHangId: number = 0;
  gioHangLst: GioHangChiTiet[] = [];

  tongTien: number = 0;

  ngOnInit() {
    this.getUserInfo();
  }

  async getUserInfo(): Promise<void> {
    const _token = Cookie.get(AuthConstant.ACCESS_TOKEN_KEY);

    const userInfo = jwtDecode(_token) as NguoiDung;
    if (userInfo.id) {
      const resp = await lastValueFrom(this.nguoidungService.get(userInfo.id));
      if (resp.status == CommonConstant.STATUS_OK_200) {
        this.userInfo = resp.data;
        if (this.userInfo.id) {
          this.getGH();
        }
      }
    }
  }

  getGH() {
    this.gioHangService.getGH(this.userInfo.id).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        if (res.data.chiTietGioHangs.length > 0) {
          this.gioHangId = res.data.id;
          this.gioHangLst = res.data.chiTietGioHangs;

          this.gioHangLst.forEach((item: GioHangChiTiet) => {
            this.tongTien += (item.soLuong || 0) * (item.thuoc?.giaBan || 0)
          })
        }
      }
    });
  }

}
