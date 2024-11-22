import { DataResponse } from "./../../../_model/resp/data-response";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonConstant } from "src/app/_constant/common.constants";
import { DangNhapModel } from "src/app/_model/dangnhap";
import { DangNhapService } from "src/app/_service/dangnhap.service";
import { Cookie } from "ng2-cookies";
import { AuthConstant } from "src/app/_constant/auth.constant";
import { jwtDecode } from "jwt-decode";
import { NguoidungService } from "src/app/_service/nguoidung.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
})
export class ProfileComponent implements OnInit {
  signup: string | any[] | null | undefined;
  constructor(
    private nguoidungService: NguoidungService,
    private router: Router
  ) {}
  user: DangNhapModel = {
    tenDangNhap: "",
    matKhau: "",
  };

  ngOnInit() {}
}
