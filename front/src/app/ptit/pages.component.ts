import { AuthConstant } from "./../_constant/auth.constant";
import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Cookie } from "ng2-cookies";
import { CommonConstant } from "../_constant/common.constants";
import { lastValueFrom } from "rxjs";
import { AuthenticationService } from "../_service/auth/authentication.service";
import { UserInfo } from "../_model/auth/user-info";
import { Role } from "../_model/auth/role";

@Component({
  selector: "app-pages",
  templateUrl: "./pages.component.html",
  styleUrls: ["./pages.component.css"],
})
export class PagesComponent implements OnInit, AfterViewInit {
  roleUser: Role[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    public router: Router
  ) {
    // this.activatedRoute.queryParams.subscribe((params) => {
    //   let accessToken = params["access_token"];
    //   if (accessToken != undefined && accessToken != "") {
    //     Cookie.set(
    //       AuthConstant.ACCESS_TOKEN_KEY,
    //       accessToken,
    //       AuthConstant.TOKEN_EXPIRE,
    //       "/"
    //     );
    //   }
    // });
  }

  async getUserInfo(): Promise<void> {
    const resp = await lastValueFrom(this.authService.getUserInfo());
    if (resp.status == CommonConstant.RESULT_OK) {
      let userInfo: UserInfo = resp.responseData;
      this.roleUser = userInfo.roles ?? [];

      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }

    // if (this.hasRole(AuthConstant.ROLE_ADMIN)) {
    //   this.router.navigate(["/sys"]);
    // } else if (this.hasRole(AuthConstant.ROLE_NORMAL)) {
    //   this.router.navigate(["/user"]);
    // }
  }

  async ngOnInit() {
    if (Cookie.check(AuthConstant.ACCESS_TOKEN_KEY)) {
      await this.getUserInfo();
    }
    // this.updateHtmlLayout();
  }

  // hasRole(roleId: string): boolean {
  //   return this.roleUser
  //     ? this.roleUser.some((role) => role.roleId === roleId)
  //     : false;
  // }

  ngAfterViewInit(): void {
    const script = document.createElement("script");
    script.src = "assets/js/app.js";
    document.body.appendChild(script);
    script.src = "assets/js/plugins.js";
    document.body.appendChild(script);
    // script.src = "assets/js/layout.js";
    // document.body.appendChild(script);
    script.src = "assets/libs/simplebar/simplebar.min.js";
    document.body.appendChild(script);
  }
}
