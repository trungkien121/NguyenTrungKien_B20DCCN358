import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonConstant } from "src/app/_constant/common.constants";
import { NguoiDung } from "src/app/_model/auth/nguoidung";
import { ToastrService } from "ngx-toastr";
import { NguoidungService } from "src/app/_service/auth/nguoidung.service";
import { lastValueFrom } from "rxjs";
import { Cookie } from "ng2-cookies";
import { AuthConstant } from "src/app/_constant/auth.constant";
import { jwtDecode } from "jwt-decode";
import { ChangePassword } from "src/app/_model/changePws";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
})
export class ProfileComponent implements OnInit {
  user = JSON.parse(localStorage.getItem("userInfo") || "{}");
  userUpdate: NguoiDung = {};

  constructor(
    private nguoidungService: NguoidungService,
    private router: Router,
    private toastService: ToastrService
  ) {}

  changePwd: ChangePassword = {};

  ngOnInit() {
    this.getUserInfo();
  }

  async getUserInfo(): Promise<void> {
    const _token = Cookie.get(AuthConstant.ACCESS_TOKEN_KEY);

    const userInfo = jwtDecode(_token) as NguoiDung;
    if (userInfo.id) {
      const resp = await lastValueFrom(this.nguoidungService.get(userInfo.id));
      if (resp.status == CommonConstant.STATUS_OK_200) {
        this.userUpdate = resp.data;
      }
    }
  }

  async updateUser() {
    this.nguoidungService.update(this.userUpdate).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        this.toastService.success("Update succuess!");

        // Cập nhật lại userInfo trong localStorage
        localStorage.setItem("userInfo", JSON.stringify(this.userUpdate));
      } else {
        this.toastService.error("Update error!");
      }
    });
  }

  checkPwd() {
    let check = true;
    if (
      this.changePwd.oldPwd == undefined ||
      this.changePwd.oldPwd.trim().length == 0
    ) {
      check = false;
      this.changePwd.oldPwd = "";
      return check;
    }

    if (
      this.changePwd.newPwd == undefined ||
      this.changePwd.newPwd.trim().length == 0
    ) {
      check = false;
      this.changePwd.newPwd = "";
      return check;
    }
    if (
      this.changePwd.confirmPwd == undefined ||
      this.changePwd.confirmPwd.trim().length == 0
    ) {
      check = false;
      this.changePwd.confirmPwd = "";
      return check;
    }

    if (this.changePwd.confirmPwd != this.changePwd.newPwd) {
      check = false;
      return check;
    }
    return true;
  }

  changePassword() {
    let nguoiDungUpdate = this.user;
    nguoiDungUpdate.matKhauMoi = this.changePwd.newPwd;
    nguoiDungUpdate.matKhau = this.changePwd.oldPwd;

    this.nguoidungService.changePwd(nguoiDungUpdate).subscribe((resp) => {
      if (resp.status == CommonConstant.STATUS_OK_200) {
        this.toastService.success("Cập nhật thành công");
        this.changePwd = {};
        this.getUserInfo();
      } else if (resp.status == CommonConstant.STATUS_OK_400) {
        this.toastService.error(resp.msg);
        this.getUserInfo();
      } else {
        this.toastService.error("Cập nhật thất bại");
      }
    });
  }
}
