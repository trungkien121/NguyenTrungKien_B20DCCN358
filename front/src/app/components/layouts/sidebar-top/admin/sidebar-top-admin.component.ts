import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { Cookie } from "ng2-cookies";
import { AuthConstant } from "src/app/_constant/auth.constant";
import { Quyen } from "src/app/_model/auth/quyen";
import { lastValueFrom, Subscription } from "rxjs";
import { jwtDecode } from "jwt-decode";
import { NguoiDung } from "src/app/_model/auth/nguoidung";
import { NguoidungService } from "src/app/_service/auth/nguoidung.service";
import { CommonConstant } from "src/app/_constant/common.constants";

@Component({
  selector: "app-sidebar-top",
  templateUrl: "./sidebar-top-admin.component.html",
  styleUrls: ["./sidebar-top-admin.component.css"],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SidebarLeftComponent implements OnInit, OnDestroy {
  constructor(
    private nguoidungService: NguoidungService,
    private cdr: ChangeDetectorRef
  ) {}

  AuthConstant = AuthConstant;

  roleUser: Quyen[] = [];
  // roleUser: Role[] = [];
  userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  isAuthenticate: boolean = false;

  isAdmin: boolean | null = false;
  isCustomer: boolean | null = false;

  private langChangeSubscription!: Subscription;

  ngOnDestroy(): void {
    // Hủy đăng ký khi component bị destroy để tránh rò rỉ bộ nhớ
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  async ngOnInit() {
    // Lấy trạng thái từ localStorage

    // Đánh dấu view cần cập nhật
    this.cdr.detectChanges();

    if (Cookie.check(AuthConstant.ACCESS_TOKEN_KEY)) {
      this.isAuthenticate = true;
      await this.getUserInfo();
    }

    console.log("admin", this.isAdmin);
    console.log("customer", this.isCustomer);
  }

  async getUserInfo(): Promise<void> {
    const _token = Cookie.get(AuthConstant.ACCESS_TOKEN_KEY);

    const userInfo = jwtDecode(_token) as NguoiDung;
    if (userInfo.id) {
      const resp = await lastValueFrom(this.nguoidungService.get(userInfo.id));
      if (resp.status == CommonConstant.STATUS_OK_200) {
        let userInfo: NguoiDung = resp.data;
        this.roleUser = userInfo.nhomQuyens ?? [];

        // Kiểm tra vai trò của người dùng
        this.isAdmin = this.hasRole(AuthConstant.ROLE_ADMIN.toString());
        this.isCustomer = this.hasRole(AuthConstant.ROLE_KHACHHANG.toString());

        this.cdr.detectChanges();
        this.cdr.markForCheck();
      }
    }
  }

  logout(): void {
    Cookie.delete(AuthConstant.ACCESS_TOKEN_KEY);
    this.isAuthenticate = false;
    this.isAdmin = null;
    this.isCustomer = null;
    this.cdr.detectChanges(); // Đảm bảo giao diện được cập nhật
  }

  hasRole(roleId: string): boolean {
    return this.roleUser
      ? this.roleUser.some((role) => role.id == roleId)
      : false;
  }
}
