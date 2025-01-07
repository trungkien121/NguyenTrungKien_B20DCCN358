import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonConstant } from "src/app/_constant/common.constants";
import { NguoiDung } from "src/app/_model/auth/nguoidung";
import { ToastrService } from "ngx-toastr";
import { NguoidungService } from "src/app/_service/auth/nguoidung.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
})
export class SignupComponent implements OnInit {
  showPassword: boolean = false; // Biến kiểm soát trạng thái hiển thị mật khẩu

  constructor(
    private nguoidungService: NguoidungService,
    private router: Router,
    private toastService: ToastrService
  ) {}

  user: NguoiDung = {
    tenDangNhap: "",
    matKhau: "",
    email: "",
  };

  ngOnInit() {}
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword; // Đổi trạng thái hiển thị
  }

  check(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]+$/; // Chỉ cho phép các ký tự số

    if (
      !this.user.tenDangNhap?.trim() ||
      !this.user.matKhau?.trim() ||
      !this.user.email?.trim() ||
      !this.user.diaChi?.trim() ||
      !this.user.soDienThoai?.trim() ||
      !this.user.hoTen?.trim()
    ) {
      this.toastService.error("Vui lòng điền đầy đủ thông tin");
      return false;
    }

    if (!emailRegex.test(this.user.email)) {
      this.toastService.error("Email không đúng định dạng");
      return false;
    }

    if (!phoneRegex.test(this.user.soDienThoai)) {
      this.toastService.error("Số điện thoại không đúng định dạng");
      return false;
    }

    return true;
  }

  signup() {
    if (!this.check()) {
      return;
    }

    this.nguoidungService.dangky(this.user).subscribe((res: any) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        this.toastService.success("Đăng ký thành công");
        this.router.navigate(["/login"]);
      }
      if (res.status == CommonConstant.STATUS_OK_400) {
        this.toastService.success(res.msg);
      }
    });
  }

  // **Thêm hàm kiểm tra email
  isValidEmail(email: string | undefined): boolean {
    if (!email) return false; // Nếu email là undefined hoặc null, trả về false.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPhoneNumber(phone: string | undefined): boolean {
    if (!phone) return false; // Nếu trống thì không hợp lệ
    const phoneRegex = /^[0-9]+$/;
    return phoneRegex.test(phone);
  }
}
