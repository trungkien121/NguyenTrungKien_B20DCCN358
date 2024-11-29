import { Component, Input, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
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
  templateUrl: "./sidebar-top.component.html",
  styleUrls: ["./sidebar-top.component.css"],
})
export class SidebarLeftComponent implements OnInit, OnDestroy {
  constructor(
    private nguoidungService: NguoidungService,

  ) {}

  AuthConstant = AuthConstant;

  @Input() roleUser: Quyen[] = [];
  // roleUser: Role[] = [];
  userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  isAuthenticate: boolean = false;

  @Input() isAdmin: boolean | null = null;
  @Input() isCustomer: boolean | null = null;


  private langChangeSubscription!: Subscription;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isAdmin']) {
      console.log('isAdmin value changed:', this.isAdmin);
    }
    if (changes['isCustomer']) {
      console.log('isCustomer value changed:', this.isCustomer);
    }
  }
  
  ngOnDestroy(): void {
    // Hủy đăng ký khi component bị destroy để tránh rò rỉ bộ nhớ
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  async ngOnInit() {
    console.log("admin", this.isAdmin)
    console.log("customer", this.isCustomer)
    if (Cookie.check(AuthConstant.ACCESS_TOKEN_KEY)) {
      this.isAuthenticate = true;
      await this.getUserInfo();
    }
  }

  async getUserInfo(): Promise<void> {
    const _token = Cookie.get(AuthConstant.ACCESS_TOKEN_KEY);

    const userInfo = jwtDecode(_token) as NguoiDung;
    if (userInfo.id) {
      const resp = await lastValueFrom(this.nguoidungService.get(userInfo.id));
      if (resp.status == CommonConstant.STATUS_OK_200) {
        let userInfo: NguoiDung = resp.data;
        this.roleUser = userInfo.nhomQuyens ?? [];

        // if (this.hasRole(AuthConstant.ROLE_ADMIN)) {
        //   this.isAdmin = true;
        // } if (this.hasRole(AuthConstant.ROLE_KHACHHANG)) {
        //   this.isCustomer = true;
        // }
      }
     

    }
  }

  hasRole(roleId: string): boolean {
    return this.roleUser
      ? this.roleUser.some((role) => role.id == roleId)
      : false;
  }
}
