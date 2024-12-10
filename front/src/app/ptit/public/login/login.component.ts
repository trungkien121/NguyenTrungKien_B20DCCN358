import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonConstant } from "src/app/_constant/common.constants";
import { DangNhapModel } from "src/app/_model/dangnhap";
import { DangNhapService } from "src/app/_service/dangnhap.service";
import { Cookie } from "ng2-cookies";
import { AuthConstant } from "src/app/_constant/auth.constant";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  showPassword: boolean = false; // Biến kiểm soát trạng thái hiển thị mật khẩu

  signup: string | any[] | null | undefined;
  constructor(
    private dangNhapService: DangNhapService,
    private router: Router,
    private toastService: ToastrService
  ) {}
  user: DangNhapModel = {
    tenDangNhap: "",
    matKhau: "",
  };

  ngOnInit() {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword; // Đổi trạng thái hiển thị
  }

  login() {
    this.dangNhapService.dangNhap(this.user).subscribe(
      (res: any) => {
        console.log(res);

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
          this.router.navigate(["/home"]);
        }
      },
      (error) => {
        // console.log(error);
        if (error == "Unauthorized") {
          this.toastService.error("Tên đăng nhập hoặc mật khẩu không đúng!");
        } else {
          this.toastService.error("Đã xảy ra lỗi, vui lòng thử lại sau!");
        }
      }
    );
  }
}
