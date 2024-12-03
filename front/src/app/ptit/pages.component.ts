import { AuthConstant } from "./../_constant/auth.constant";
import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Cookie } from "ng2-cookies";
import { NguoiDung } from "../_model/auth/nguoidung";
import { Quyen } from "../_model/auth/quyen";
import { jwtDecode } from "jwt-decode";
import { NguoidungService } from "../_service/auth/nguoidung.service";
import { BehaviorSubject, lastValueFrom } from "rxjs";
import { CommonConstant } from "../_constant/common.constants";

@Component({
  selector: "app-pages",
  templateUrl: "./pages.component.html",
  styleUrls: ["./pages.component.css"],
})
export class PagesComponent implements OnInit, AfterViewInit {
  roleUser: Quyen[] = [];

  
  isAdmin$ = new BehaviorSubject<boolean>(false);
  isCustomer$ = new BehaviorSubject<boolean>(false);
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: NguoidungService,
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
    const _token = Cookie.get(AuthConstant.ACCESS_TOKEN_KEY);

    const userInfo = jwtDecode(_token) as NguoiDung;
    if (userInfo.id) {
      const resp = await lastValueFrom(this.authService.get(userInfo.id));
      if (resp.status == CommonConstant.STATUS_OK_200) {
        let userInfo: NguoiDung = resp.data;
        this.roleUser = userInfo.nhomQuyens ?? [];

        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      }

    //      if (this.hasRole(AuthConstant.ROLE_ADMIN)) {
    //   this.router.navigate(["/sys"]);
    // } else if (this.hasRole(AuthConstant.ROLE_KHACHHANG)) {
    //   this.router.navigate(["/home"]);
    // }

    this.isAdmin$.next(this.hasRole(AuthConstant.ROLE_ADMIN));
    this.isCustomer$.next(this.hasRole(AuthConstant.ROLE_KHACHHANG));
    console.log("admin", this.isAdmin$)
    console.log("customer", this.isCustomer$)
    }

 
  }

  async ngOnInit() {
    if (Cookie.check(AuthConstant.ACCESS_TOKEN_KEY)) {
      await this.getUserInfo();
    }
    // this.updateHtmlLayout();
  }

  hasRole(roleId: string): boolean {
    return this.roleUser
      ? this.roleUser.some((role) => role.id == roleId)
      : false;
  }

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
