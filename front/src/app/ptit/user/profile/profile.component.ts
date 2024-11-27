import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonConstant } from "src/app/_constant/common.constants";
import { NguoiDung } from "src/app/_model/auth/nguoidung";
import { ToastrService } from "ngx-toastr";
import { NguoidungService } from "src/app/_service/auth/nguoidung.service";

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

  ngOnInit() {
    this.userUpdate = { ...this.user };
    console.log("user", this.userUpdate);
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
}
