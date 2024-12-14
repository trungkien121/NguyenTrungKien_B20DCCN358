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
import { DonhangService } from "src/app/_service/donhang.service";
import { DonHang } from "src/app/_model/hoadon";
import { ThongBaoService } from "src/app/_service/thongbao.service";
import { ThongBao } from "src/app/_model/thongbao";

@Component({
  selector: "app-thongbao",
  templateUrl: "./thongbao.component.html",
})
export class ThongBaoComponent implements OnInit {
  constructor(
    private nguoidungService: NguoidungService,
    private gioHangService: GioHangService,
    private donHangService: DonhangService,
    private thongbaoService: ThongBaoService,
    private router: Router,
    private toastService: ToastrService
  ) {}

  user = JSON.parse(localStorage.getItem("userInfo") || "{}");
  userUpdate: NguoiDung = {};

  userInfo: NguoiDung = {};
  thongbaoId: number = 0;
  thongbaoLst: ThongBao[] = [];

  imageUrl: string | ArrayBuffer | null = null; // Biến để lưu đường dẫn hình ảnh đã chọn
  tongTien: number = 0;

  logout() {
    this.nguoidungService.logOut(true);
  }

  ngOnInit() {
    this.getUserInfo();
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
        if (res.data.chiTietGioHangs.length > 0) {
        }
      }
    });
  }

  deleteGioHang(item: GioHangChiTiet) {
    this.gioHangService.deleteGH(item.id).subscribe((resp) => {
      if (resp.status == CommonConstant.STATUS_OK_200) {
        this.toastService.success("Xóa thành công");
        this.getGH();
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

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageUrl = e.target.result; // Cập nhật đường dẫn hình ảnh
      };

      reader.readAsDataURL(file); // Đọc tệp hình ảnh

      // Lưu tệp vào thuộc tính thuoc.file
      this.userUpdate.file = file;
    }
  }
}
