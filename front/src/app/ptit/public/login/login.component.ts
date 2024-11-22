import { DataResponse } from "./../../../_model/resp/data-response";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonConstant } from "src/app/_constant/common.constants";
import { DangNhapModel } from "src/app/_model/dangnhap";
import { DangNhapService } from "src/app/_service/dangnhap.service";
import { Cookie } from "ng2-cookies";
import { AuthConstant } from "src/app/_constant/auth.constant";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  signup: string | any[] | null | undefined;
  constructor(
    private dangNhapService: DangNhapService,
    private router: Router
  ) {}
  user: DangNhapModel = {
    tenDangNhap: "",
    matKhau: "",
  };

  ngOnInit() {}

  login() {
    this.dangNhapService.dangNhap(this.user).subscribe((res: any) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        const _token = res.data;
        if (_token) {
          Cookie.set(
            AuthConstant.ACCESS_TOKEN_KEY,
            _token,
            AuthConstant.TOKEN_EXPIRE,
            "/"
          );
        }
        this.router.navigate(["/sys/product"]);
      }
      // console.log(res)
    });
  }
}
