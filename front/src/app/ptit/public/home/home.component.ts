import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonConstant } from "src/app/_constant/common.constants";
import { SearchModel } from "src/app/_model/common/Search";
import { LoaiThuoc } from "src/app/_model/loaithuoc";
import { Thuoc } from "src/app/_model/thuoc";
import { LoaithuocService } from "src/app/_service/loaithuoc.service";
import { ThuocService } from "src/app/_service/thuoc.service";
import { Cookie } from "ng2-cookies";
import { AuthConstant } from "src/app/_constant/auth.constant";
import { GioHangChiTiet } from "src/app/_model/giohangchitiet";
import { GioHang } from "src/app/_model/giohang";
import { ToastrService } from "ngx-toastr";
import { GioHangService } from "./../../../_service/giohang.service";
import { NguoiDung } from "src/app/_model/auth/nguoidung";
import { jwtDecode } from "jwt-decode";
import { lastValueFrom } from "rxjs";
import { NguoidungService } from "src/app/_service/auth/nguoidung.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  productLst: Thuoc[] = [];
  loaithuocLst: LoaiThuoc[] = [];

  gioHangId: number = 0;
  userInfo: NguoiDung = {};
  thuoc: Thuoc = {};

  modelSearch: SearchModel = {
    keyWord: "",
    id: 0,
    currentPage: 0,
    size: 100,
    sortedField: "",
  };

  totalRows: number = 0;

  constructor(
    private thuocService: ThuocService,
    private loaithuocService: LoaithuocService,
    private router: Router,
    private gioHangService: GioHangService,
    private nguoidungService: NguoidungService,

    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.getData();
  }

  search() {
    this.getThuoc();
  }
  getData() {
    this.getThuoc();

    this.getUserInfo();
  }

  async getUserInfo(): Promise<void> {
    const _token = Cookie.get(AuthConstant.ACCESS_TOKEN_KEY);

    const userInfo = jwtDecode(_token) as NguoiDung;
    if (userInfo.id) {
      const resp = await lastValueFrom(this.nguoidungService.get(userInfo.id));
      if (resp.status == CommonConstant.STATUS_OK_200) {
        this.userInfo = resp.data;

        if (
          this.userInfo.nhomQuyens?.some(
            (quyen) => quyen.id == AuthConstant.ROLE_ADMIN.toString()
          )
        ) {
        }
        if (this.userInfo.id) {
          this.getGH();
        }
      }
    }
  }

  getGH() {
    this.gioHangService.getGH(this.userInfo.id).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        if (res.data.id) {
          this.gioHangId = res.data.id;
        }
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

  addProductInCart(item: Thuoc): void {
    if (Cookie.check(AuthConstant.ACCESS_TOKEN_KEY)) {
      this.createGH(item);
    } else {
      this.router.navigate([`/login`]);
    }
  }

  createGH(item: Thuoc): void {
    let gioHang: GioHangChiTiet = {
      gioHangId: this.gioHangId,
      soLuong: 1,
      thuocId: Number(item.id),
      donGia: item.giaBan,
    };

    // console.log(gioHang)

    this.gioHangService.createGH(gioHang).subscribe((resp) => {
      if (resp.status == CommonConstant.STATUS_OK_200) {
        // this.toastService.success("Lưu thành công");
        // this.router.navigate([`/user/giohang`]);
        this.gioHangService.getGHSubject(this.userInfo.id).subscribe();
      } else {
        this.toastService.error("Lưu thất bại");
      }
    });
  }
}
