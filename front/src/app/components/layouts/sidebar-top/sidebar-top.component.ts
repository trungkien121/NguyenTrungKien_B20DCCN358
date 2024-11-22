import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Cookie } from "ng2-cookies";
import { AuthConstant } from "src/app/_constant/auth.constant";
import { Quyen } from "src/app/_model/auth/quyen";
import { Subscription } from "rxjs";

@Component({
  selector: "app-sidebar-top",
  templateUrl: "./sidebar-top.component.html",
  styleUrls: ["./sidebar-top.component.css"],
})
export class SidebarLeftComponent implements OnInit, OnDestroy {
  constructor() {}

  AuthConstant = AuthConstant;

  @Input() roleUser: Quyen[] = [];
  // roleUser: Role[] = [];
  userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  isAuthenticate: boolean = false;

  private langChangeSubscription!: Subscription;

  ngOnDestroy(): void {
    // Hủy đăng ký khi component bị destroy để tránh rò rỉ bộ nhớ
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  async ngOnInit() {
    if (Cookie.check(AuthConstant.ACCESS_TOKEN_KEY)) {
      this.isAuthenticate = true;
    }
    this.roleUser = this.userInfo.roles ?? [];
    // Extract roleId values
    let roles = this.userInfo.roles?.map((role: any) => role.roleId) ?? [];
  }

  // async getUserInfo(): Promise<void> {
  //   const resp = await lastValueFrom(this.authService.getUserInfo());
  //   if (resp.status == CommonConstant.RESULT_OK) {
  //     let userInfo: UserInfo = resp.responseData;
  //     this.roleUser = userInfo.roles ?? [];
  //     // this.isAuthenticate = true;
  //   }

  //   // if (this.hasRole(AuthConstant.ROLE_ADMIN)) {
  //   //   this.router.navigate(["/sys"]);
  //   // } else if (this.hasRole(AuthConstant.ROLE_NORMAL)) {
  //   //   this.router.navigate(["/user"]);
  //   // }
  // }

  hasRole(roleId: string): boolean {
    return this.roleUser
      ? this.roleUser.some((role) => role.id == roleId)
      : false;
  }
}
