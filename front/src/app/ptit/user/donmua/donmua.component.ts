import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonConstant } from "src/app/_constant/common.constants";
import { NguoiDung } from "src/app/_model/auth/nguoidung";
import { ToastrService } from "ngx-toastr";
import { NguoidungService } from "src/app/_service/auth/nguoidung.service";
import { lastValueFrom } from "rxjs";
import { Cookie } from "ng2-cookies";
import { AuthConstant } from "src/app/_constant/auth.constant";
import { jwtDecode } from "jwt-decode";
import { ChangePassword } from "src/app/_model/changePws";
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from "primeng/api";
import { DonhangService } from "src/app/_service/donhang.service";
import { SearchModel } from "src/app/_model/common/Search";
import { TrangThaiGiaoHang } from "src/app/_constant/trangthaigioahang.constant";
import { ChiTietDonHang } from "src/app/_model/chitietdonhang";
import { DonHang } from "src/app/_model/hoadon";
import { DanhGia } from "src/app/_model/danhgia";
import { DanhgiaService } from "src/app/_service/danhgia.service";
import { TrangThaiThanhToan } from "src/app/_constant/trangthaithanhtoan.constant";
import { Thuoc } from "src/app/_model/thuoc";
import { GioHangService } from "src/app/_service/giohang.service";
import { GioHangChiTiet } from "src/app/_model/giohangchitiet";

@Component({
  selector: "app-mua",
  providers: [ConfirmationService, MessageService],
  templateUrl: "./donmua.component.html",
})
export class DonMuaComponent implements OnInit {
  user = JSON.parse(localStorage.getItem("userInfo") || "{}");
  userUpdate: NguoiDung = {};

  constructor(
    private nguoidungService: NguoidungService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private donhangService: DonhangService,
    private danhgiaService: DanhgiaService,
    private route: ActivatedRoute,
    private gioHangService: GioHangService,

    private toastService: ToastrService
  ) {}
  TrangThaiGiaoHang = TrangThaiGiaoHang;
  imageUrl: string | ArrayBuffer | null = null; // Biến để lưu đường dẫn hình ảnh đã chọn

  donhangLst: DonHang[] = [];
  donhangDanhGia: DonHang = {};

  danhGia: DanhGia = {
    danhGia: "",
    diemSo: 5,
  };

  userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  gioHangLst: GioHangChiTiet[] = [];
  gioHangId: number = 0;

  totalRow: number = 0;

  modelSearch: SearchModel = {
    keyWord: "",
    id: 0,
    currentPage: 0,
    size: 100,
    sortedField: "",
  };

  tab: number = 0;
  showDetail(thuoc: any) {
    this.router.navigate([`/thuoc-chitiet/${thuoc.id}`]);
  }

  danhGiaDH() {
    this.danhGia.nguoiDungId = this.user.id;
    console.log(this.donhangDanhGia);

    this.donhangDanhGia.chiTietDonHangs?.forEach((item: ChiTietDonHang) => {
      this.danhGia.thuocId = item.thuoc?.id;
      this.danhgiaService.create(this.danhGia).subscribe((resp) => {
        if (resp.status == CommonConstant.STATUS_OK_200) {
          this.toastService.success("Lưu thành công");
          // this.router.navigate(["/sys/product"]);
        } else if (resp.status == CommonConstant.STATUS_OK_409) {
          this.toastService.error(resp.msg);
        } else {
          this.toastService.error("Lưu thất bại");
        }
      });
    });
  }
  updateDiemSo(newScore: number): void {
    this.danhGia.diemSo = newScore;
  }

  logout() {
    this.nguoidungService.logOut(true);
  }

  changeTab(tab: number) {
    this.tab = tab;

    if (this.tab == 1) {
      this.modelSearch.keyWord = "";
    } else if (this.tab == 2) {
      this.modelSearch.keyWord = TrangThaiGiaoHang.DANG_XU_LY;
    } else if (this.tab == 3) {
      this.modelSearch.keyWord = TrangThaiGiaoHang.DANG_GIAO;
    } else if (this.tab == 4) {
      this.modelSearch.keyWord = TrangThaiGiaoHang.DA_GIAO;
    } else if (this.tab == 5) {
      this.modelSearch.keyWord = TrangThaiGiaoHang.DA_HUY;
    } else if (this.tab == 6) {
      this.modelSearch.keyWord = TrangThaiGiaoHang.TRA_HANG;
    }

    this.getData();
  }

  ngOnInit() {
    this.modelSearch.id = this.user.id;
    this.route.queryParams.subscribe((params) => {
      const paymentStatus = params["paymentStatus"];
      const pendingOrder = localStorage.getItem("pendingOrder");

      if (paymentStatus == "success") {
        // Gọi API lưu đơn hàng
        this.donhangService.create(pendingOrder).subscribe((resp) => {
          if (resp.status == CommonConstant.STATUS_OK_200) {
            this.toastService.success("Lưu đơn hàng thành công");
            // Xóa giỏ hàng nếu cần
            this.clearCart();
            // Điều hướng
            this.router.navigate(["/user/donmua"]);
          } else {
            this.toastService.error("Lưu đơn hàng thất bại");
          }
        });
      } else {
        // this.toastService.error("Thanh toán không thành công");
      }
    });

    this.getUserInfo();

    this.getData();
  }

  clearCart() {
    this.gioHangService.getGH(this.userInfo.id).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        if (res.data.chiTietGioHangs.length > 0) {
          this.gioHangId = res.data.id;
          this.gioHangLst = res.data.chiTietGioHangs;

          this.gioHangLst.forEach((item: GioHangChiTiet) => {
            this.gioHangService.deleteGH(item.id).subscribe((resp) => {
              if (resp.status == CommonConstant.STATUS_OK_200) {
                // this.toastService.success("Xóa giỏ hàng thành công");
              } else {
                this.toastService.error("Xóa giỏ hàng thất bại");
              }
            });
          });
        }
      }
    });
  }

  async getUserInfo(): Promise<void> {
    const _token = Cookie.get(AuthConstant.ACCESS_TOKEN_KEY);

    const userInfo = jwtDecode(_token) as NguoiDung;
    if (userInfo.id) {
      const resp = await lastValueFrom(this.nguoidungService.get(userInfo.id));
      if (resp.status == CommonConstant.STATUS_OK_200) {
        this.userUpdate = resp.data;

        this.userInfo = resp.data;
      }
    }
  }
  getData() {
    this.donhangService.getLst(this.modelSearch).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        this.donhangLst = res.data.data.reverse();
        this.totalRow = res.data.totalElements;
        // console.log(this.donhangLst.length);
      }
    });
  }

  async updateUser() {
    this.nguoidungService.update(this.userUpdate).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        this.toastService.success("Update succuess!");

        // Cập nhật lại userInfo trong localStorage
        localStorage.setItem("userInfo", JSON.stringify(this.userUpdate));

        window.location.reload();
      } else {
        this.toastService.error("Update error!");
      }
    });
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageUrl = e.target.result; // Cập nhật đường dẫn hình ảnh
      };

      reader.readAsDataURL(file); // Đọc tệp hình ảnh

      // Lưu tệp vào thuộc tính thuoc.file
      this.userUpdate.file = file;
    }
  }

  preSave(donhang: DonHang) {
    if (donhang.khachHang) {
      donhang.khachHangId = donhang.khachHang.id;
    }

    donhang.chiTietDonHangs?.forEach((item: ChiTietDonHang) => {
      item.thuocId = item.thuoc?.id;
    });
  }

  traDonHang(donhang: DonHang) {
    if (donhang.khachHang) {
      donhang.khachHangId = donhang.khachHang.id;
    }

    donhang.chiTietDonHangs?.forEach((item: ChiTietDonHang) => {
      item.thuocId = item.thuoc?.id;
    });

    donhang.trangThaiGiaoHang = TrangThaiGiaoHang.TRA_HANG;

    this.updateDonHang(donhang);
  }

  huyDonHang(donhang: DonHang) {
    if (donhang.khachHang) {
      donhang.khachHangId = donhang.khachHang.id;
    }

    donhang.chiTietDonHangs?.forEach((item: ChiTietDonHang) => {
      item.thuocId = item.thuoc?.id;
    });

    donhang.trangThaiGiaoHang = TrangThaiGiaoHang.DA_HUY;

    this.updateDonHang(donhang);
  }

  nhanDonHang(donhang: DonHang) {
    if (donhang.khachHang) {
      donhang.khachHangId = donhang.khachHang.id;
    }

    donhang.chiTietDonHangs?.forEach((item: ChiTietDonHang) => {
      item.thuocId = item.thuoc?.id;
    });

    donhang.trangThaiGiaoHang = TrangThaiGiaoHang.DA_GIAO;
    donhang.trangThaiThanhToan = TrangThaiThanhToan.DA_THANH_TOAN;

    this.updateDonHang(donhang);
  }

  updateDonHang(donhang: DonHang) {
    this.donhangService.changTrangThaiGiaoHang(donhang).subscribe((resp) => {
      if (resp.status == CommonConstant.STATUS_OK_200) {
        this.toastService.success("Cập nhật thành công");
        this.getData();
      } else if (resp.status == CommonConstant.STATUS_OK_409) {
        this.toastService.error(resp.msg);
      } else {
        this.toastService.error("Cập nhật thất bại");
      }
    });
  }
  xemChiTiet(donhang: DonHang) {
    this.router.navigate(["/user/donmua-chitiet", donhang.id]);
  }
}
