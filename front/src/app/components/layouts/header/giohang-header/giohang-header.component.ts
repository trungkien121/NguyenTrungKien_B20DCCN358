import { Component, OnInit } from "@angular/core";
import { CommonConstant } from "src/app/_constant/common.constants";
import { NguoiDung } from "src/app/_model/auth/nguoidung";
import { NguoidungService } from "src/app/_service/auth/nguoidung.service";
import { GioHangService } from "src/app/_service/giohang.service";
import { Cookie } from "ng2-cookies";
import { AuthConstant } from "src/app/_constant/auth.constant";
import { jwtDecode } from "jwt-decode";
import { lastValueFrom } from "rxjs";
import { GioHangChiTiet } from "src/app/_model/giohangchitiet";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-giohang-header",
  styleUrls: ["./giohang-header.component.css"],
  templateUrl: "./giohang-header.component.html",
})
export class GiohangHeaderComponent implements OnInit {
  constructor(
    private nguoidungService: NguoidungService,
    private gioHangService: GioHangService,
    private toastService: ToastrService
  ) {}

  userInfo: NguoiDung = {};
  gioHangId: number = 0;
  gioHangLst: GioHangChiTiet[] = [];

  tongTien: number = 0;
  isHoverDropdown: boolean = false;
  isFirst: boolean = true;

  ngOnInit() {
    this.getUserInfo();

    this.gioHangService.getGioHangSubject().subscribe((giohangs) => {
      this.gioHangId = giohangs.id!;

      // Kiểm tra xem giohangs có phải là mảng không
      this.gioHangLst = giohangs.chiTietGioHangs as GioHangChiTiet[]; // Gán giá trị nếu là mảng

      // Kích hoạt dropdown hover nếu có thay đổi
      if (this.gioHangLst.length > 0) {
        this.isHoverDropdown = true;

        // Tự động tắt sau 3 giây nếu cần
        setTimeout(() => {
          this.isHoverDropdown = false;
          this.isFirst = false;
        }, 3000);
      }
    });
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
    this.gioHangService.getGHSubject(this.userInfo.id).subscribe((res) => {
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
      } else {
        this.toastService.error("Xóa thất bại");
      }
    });
  }
}
