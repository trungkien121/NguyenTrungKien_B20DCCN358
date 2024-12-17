import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { LoaderService } from "src/app/_service/comm/loader.service";
import { Cookie } from "ng2-cookies";
import { AuthConstant } from "src/app/_constant/auth.constant";
import { NguoidungService } from "src/app/_service/auth/nguoidung.service";
import { NguoiDung } from "src/app/_model/auth/nguoidung";
import { GioHangChiTiet } from "src/app/_model/giohangchitiet";
import { GioHangService } from "src/app/_service/giohang.service";
import { jwtDecode } from "jwt-decode";
import { lastValueFrom } from "rxjs";
import { CommonConstant } from "src/app/_constant/common.constants";
import { Quyen } from "src/app/_model/auth/quyen";

declare var $: any;

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  language: string | undefined;
  srcIconLang: string | undefined;

  isAuthenticate: boolean = false;

  userInfo: NguoiDung = {};
  gioHangId: number = 0;
  gioHangLst: GioHangChiTiet[] = [];

  isAdmin: boolean | null = false;
  roleUser: Quyen[] = [];

  constructor(
    private nguoidungService: NguoidungService,
    private gioHangService: GioHangService,
    private toastService: ToastrService,
    private loading: LoaderService
  ) {}

  ngOnInit(): void {
    if (Cookie.check(AuthConstant.ACCESS_TOKEN_KEY)) {
      this.isAuthenticate = true;

      this.getUserInfo();
    }
  }

  async getUserInfo(): Promise<void> {
    const _token = Cookie.get(AuthConstant.ACCESS_TOKEN_KEY);

    const userInfo = jwtDecode(_token) as NguoiDung;
    if (userInfo.id) {
      const resp = await lastValueFrom(this.nguoidungService.get(userInfo.id));
      if (resp.status == CommonConstant.STATUS_OK_200) {
        this.userInfo = resp.data;

        this.roleUser = this.userInfo.nhomQuyens ?? [];

        this.isAdmin = this.hasRole(AuthConstant.ROLE_ADMIN.toString());
      }
    }
  }

  hasRole(roleId: string): boolean {
    return this.roleUser
      ? this.roleUser.some((role) => role.id == roleId)
      : false;
  }

  logout() {
    this.nguoidungService.logOut(true);
  }

  login() {
    this.nguoidungService.logIn();
  }

  useLanguage(language: string, $event: any) {}

  getIconLang() {}
}
