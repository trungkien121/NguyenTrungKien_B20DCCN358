import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonConstant } from "src/app/_constant/common.constants";
import { NguoiDung } from "src/app/_model/auth/nguoidung";
import { ToastrService } from "ngx-toastr";
import { NguoidungService } from "src/app/_service/auth/nguoidung.service";
import { GioHangService } from "src/app/_service/giohang.service";
import { Cookie } from "ng2-cookies";
import { AuthConstant } from "src/app/_constant/auth.constant";
import { jwtDecode } from "jwt-decode";
import { lastValueFrom } from "rxjs";
import { GioHangChiTiet } from "src/app/_model/giohangchitiet";

@Component({
  selector: "app-giohang",
  templateUrl: "./giohang.component.html",
})
export class GiohangComponent implements OnInit {
  constructor(
    private nguoidungService: NguoidungService,
    private gioHangService: GioHangService,
    private router: Router,
    private toastService: ToastrService
  ) {}

  userInfo: NguoiDung = {};
  gioHangId: number = 0;
  gioHangLst: GioHangChiTiet[] = [];

  tongTien: number = 0;

  ngOnInit() {
    this.getUserInfo();

    this.gioHangService.getGioHangSubject().subscribe((giohangs) => {
      this.gioHangId = giohangs.id!;

      // Kiểm tra xem giohangs có phải là mảng không
      this.gioHangLst = giohangs.chiTietGioHangs as GioHangChiTiet[]; // Gán giá trị nếu là mảng
    });
  }

  async getUserInfo(): Promise<void> {
    const _token = Cookie.get(AuthConstant.ACCESS_TOKEN_KEY);

    const userInfo = jwtDecode(_token) as NguoiDung;
    console.log("Thông tin token:", userInfo.id);
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
        if (res.data.chiTietGioHangs.length >= 0) {
          this.gioHangId = res.data.id;
          this.gioHangLst = res.data.chiTietGioHangs;

          this.gioHangLst.forEach((item: GioHangChiTiet) => {
            this.tongTien += (item.soLuong || 0) * (item.thuoc?.giaBan || 0);
          });
        }
      }
    });
  }

  deleteGioHang(item: GioHangChiTiet) {
    this.gioHangService.deleteGH(item.id).subscribe((resp) => {
      if (resp.status == CommonConstant.STATUS_OK_200) {
        // this.toastService.success("Xóa thành công");
        this.gioHangService.getGHSubject(this.userInfo.id).subscribe();
        this.getGH();
        // window.location.reload();
      } else {
        this.toastService.error("Xóa thất bại");
      }
    });
  }

  updateGioHang(item: GioHangChiTiet) {
    this.gioHangService.updateGH(item).subscribe((resp) => {
      if (resp.status == CommonConstant.STATUS_OK_200) {
        // this.toastService.success("Cập nhật thành công");
        this.getGH();
        this.gioHangService.getGHSubject(this.userInfo.id).subscribe();
      } else {
        this.toastService.error("Cập nhật thất bại");
      }
    });
  }

  minusQuantity(item: GioHangChiTiet) {
    if (item.soLuong) {
      if (item.soLuong == 1) {
      } else {
        item.soLuong = item.soLuong - 1;
        this.updateGioHang(item);
      }
    }
  }

  addQuantity(item: GioHangChiTiet) {
    if (item.soLuong) {
      item.soLuong = item.soLuong + 1;
    }
    this.updateGioHang(item);
  }
}
