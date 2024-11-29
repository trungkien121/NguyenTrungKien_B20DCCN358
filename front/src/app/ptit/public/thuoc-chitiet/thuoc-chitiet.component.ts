import { GioHangService } from "./../../../_service/giohang.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { jwtDecode } from "jwt-decode";
import { Cookie } from "ng2-cookies";
import { ToastrService } from "ngx-toastr";
import { lastValueFrom } from "rxjs";
import { AuthConstant } from "src/app/_constant/auth.constant";
import { CommonConstant } from "src/app/_constant/common.constants";
import { NguoiDung } from "src/app/_model/auth/nguoidung";
import { SearchModel } from "src/app/_model/common/Search";
import { GioHang } from "src/app/_model/giohang";
import { GioHangChiTiet } from "src/app/_model/giohangchitiet";
import { LoaiThuoc } from "src/app/_model/loaithuoc";
import { Thuoc } from "src/app/_model/thuoc";
import { NguoidungService } from "src/app/_service/auth/nguoidung.service";
import { LoaithuocService } from "src/app/_service/loaithuoc.service";
import { ThuocService } from "src/app/_service/thuoc.service";

@Component({
  selector: "app-thuoc-chitiet",
  templateUrl: "./thuoc-chitiet.component.html",
})
export class ThuocChiTietComponent implements OnInit {
  thuoc: Thuoc = {};
  loaithuocLst: LoaiThuoc[] = [];

  userInfo: NguoiDung = {};

  gioHangId: number = 0;

  constructor(
    private thuocService: ThuocService,
    private loaithuocService: LoaithuocService,
    private router: Router,
    private route: ActivatedRoute,
    private gioHangService: GioHangService,
    private nguoidungService: NguoidungService,
    private toastService: ToastrService
  ) {}

  ngOnInit() {
    this.getData();
    this.getThuocByParam();

    this.getUserInfo();
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

  addProductInCart() {
    if (Cookie.check(AuthConstant.ACCESS_TOKEN_KEY)) {
      this.createGH();
    } else {
      this.router.navigate([`/login`]);
    }
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
        if (res.data.id){
          this.gioHangId = res.data.id;
        } 
      }
    });
  }

  createGH() {
    let gioHang: GioHangChiTiet = {
      gioHangId: this.gioHangId,
      soLuong: 1,
      thuocId: Number(this.thuoc.id),
      dongia: this.thuoc.giaBan,
    };

    this.gioHangService.createGH(gioHang).subscribe((resp) => {
      if (resp.status == CommonConstant.STATUS_OK_200) {
        this.toastService.success("Lưu thành công");
        this.router.navigate([`/user/giohang`]);
      } else {
        this.toastService.error("Lưu thất bại");
      }
    });
  }
}
