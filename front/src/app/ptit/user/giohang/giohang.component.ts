import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonConstant } from "src/app/_constant/common.constants";
import { NguoiDung } from "src/app/_model/auth/nguoidung";
import { ToastrService } from "ngx-toastr";
import { NguoidungService } from "src/app/_service/auth/nguoidung.service";

@Component({
  selector: "app-giohang",
  templateUrl: "./giohang.component.html",
})
export class GiohangComponent implements OnInit {
  constructor(
    private nguoidungService: NguoidungService,
    private router: Router,
    private toastService: ToastrService
  ) {}

  ngOnInit() {}
}
