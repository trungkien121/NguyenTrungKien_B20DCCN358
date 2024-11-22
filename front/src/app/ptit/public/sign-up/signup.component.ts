import { DataResponse } from "./../../../_model/resp/data-response";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonConstant } from "src/app/_constant/common.constants";
import { DangNhapModel } from "src/app/_model/dangnhap";
import { DangNhapService } from "src/app/_service/dangnhap.service";
import { Cookie } from "ng2-cookies";
import { AuthConstant } from "src/app/_constant/auth.constant";
import { NguoiDung } from "src/app/_model/auth/nguoidung";
import { ToastrService } from "ngx-toastr";
import { NguoidungService } from "src/app/_service/auth/nguoidung.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
})
export class SignupComponent implements OnInit {
  constructor(
    private nguoidungService: NguoidungService,
    private router: Router,
    private toastService: ToastrService
  ) {}
  user: NguoiDung = {
    tenDangNhap: "",
    matKhau: "",
    email: "",
  };

  ngOnInit() {}

  check(): boolean {
    if (
      !this.user.tenDangNhap?.trim() ||
      !this.user.matKhau?.trim() ||
      !this.user.email?.trim() ||
      !this.user.diaChi?.trim() ||
      !this.user.soDienThoai?.trim() ||
      !this.user.hoTen?.trim()
    ) {
      this.toastService.error("Vui lòng điền đầy đủ thông tin");
      return false;
    }
    return true;
  }

  signup() {
    if (!this.check()) {
      return;
    }

    this.nguoidungService.create(this.user).subscribe((res: any) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        this.toastService.success("Đăng ký thành công");
        // this.router.navigate(["/login"]);
      }
    });
  }
}
