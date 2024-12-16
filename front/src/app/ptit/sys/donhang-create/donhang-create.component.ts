import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { jwtDecode } from "jwt-decode";
import { Cookie } from "ng2-cookies";
import { ToastrService } from "ngx-toastr";
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from "primeng/api";
import { lastValueFrom } from "rxjs";
import { AuthConstant } from "src/app/_constant/auth.constant";
import { CommonConstant } from "src/app/_constant/common.constants";
import { PhuongThucThanhToan } from "src/app/_constant/phuongthucthanhtoan.constant";
import { NguoiDung } from "src/app/_model/auth/nguoidung";
import { ChiTietDonHang } from "src/app/_model/chitietdonhang";
import { ChiTietPhieuNhap } from "src/app/_model/chitietphieunhap";
import { OptionSelect } from "src/app/_model/common/Option";
import { SearchModel } from "src/app/_model/common/Search";
import { DonHang } from "src/app/_model/hoadon";
import { NhaCungCap } from "src/app/_model/ncc";
import { PhieuNhap } from "src/app/_model/phieunhap";
import { Thuoc } from "src/app/_model/thuoc";
import { NguoidungService } from "src/app/_service/auth/nguoidung.service";
import { DonhangService } from "src/app/_service/donhang.service";
import { NCCService } from "src/app/_service/ncc.service";
import { PhieuNhapService } from "src/app/_service/phieunhap.service";

@Component({
  selector: "app-donhang-creare",
  templateUrl: "./donhang-create.component.html",
  providers: [ConfirmationService, MessageService],
})
export class DonHangCreateComponent implements OnInit {
  constructor(
    public translate: TranslateService,
    private nguoidungService: NguoidungService,
    private phieunhapService: PhieuNhapService,
    private donhangService: DonhangService,

    private toastService: ToastrService,
    private router: Router,
    private nccService: NCCService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  nguoidungHoten: string = "";

  chiTietDonHangLst: ChiTietDonHang[] = [];

  donhang: DonHang = {};

  nccLst: NhaCungCap[] = [];

  displayDialog: boolean = false;
  displayDialogKH: boolean = false;

  userInfo: NguoiDung = {};

  thuocSelected: Thuoc[] = [];
  khSelected: NguoiDung[] = [];

  modelSearchNCC: SearchModel = {
    keyWord: "",
    id: 0,
    currentPage: 0,
    size: 10,
    sortedField: "",
  };

  openSelectThuoc() {
    this.thuocSelected = [];
    this.chiTietDonHangLst.forEach((item) => {
      if (item.thuoc) this.thuocSelected.push(item.thuoc);
    });

    this.displayDialog = true;
  }

  openSelectKH() {
    this.khSelected = [];
    this.chiTietDonHangLst.forEach((item) => {
      if (item.thuoc) this.khSelected.push(item);
    });

    this.displayDialogKH = true;
  }

  handleCancel(displayDialog: boolean) {
    this.displayDialog = displayDialog;
    // this.courseNew = {};
  }

  handleCancelKH(displayDialog: boolean) {
    this.displayDialogKH = displayDialog;
    // this.courseNew = {};
  }

  handleSaveThuoc(thuocSelected: Thuoc[]) {
    // console.log("selected", thuocSelected);
    this.thuocSelected = thuocSelected;

    this.chiTietDonHangLst = [];
    this.thuocSelected.forEach((item) => {
      this.chiTietDonHangLst.push({
        thuoc: item,
        donGia: 0,
        soLuong: 0,
        thuocId: item.id,
      });
    });
  }

  handleSaveKH(customerSelected: NguoiDung) {
    // console.log("selected", thuocSelected);
    this.donhang.khachHang = customerSelected;
    this.donhang.khachHangId = customerSelected.id;

    if (customerSelected.hoTen) this.nguoidungHoten = customerSelected.hoTen;
  }

  addThuoc() {
    const thanhPhanThuocNew = {
      id: "",
      donGia: 0,
      soLuong: 0,
      thuocId: "",
    };
    this.chiTietDonHangLst.push(thanhPhanThuocNew);
  }

  ngOnInit() {
    this.getUserInfo();

    let newDate = new Date();
    const date = new Date(newDate);

    this.donhang.createdAt = `${date.getFullYear()}-${(
      "0" +
      (date.getMonth() + 1)
    ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
  }

  async getUserInfo(): Promise<void> {
    const _token = Cookie.get(AuthConstant.ACCESS_TOKEN_KEY);

    const userInfo = jwtDecode(_token) as NguoiDung;
    if (userInfo.id) {
      const resp = await lastValueFrom(this.nguoidungService.get(userInfo.id));
      if (resp.status == CommonConstant.STATUS_OK_200) {
        this.userInfo = resp.data;

        this.donhang.nguoiDungId = this.userInfo.id;
        this.donhang.nguoiDung = this.userInfo;
      }
    }
  }

  check(model: DonHang) {
    let check = true;

    // if (ncc.soDienThoai == undefined || ncc.soDienThoai.trim().length == 0) {
    //   check = false;
    //   this.ncc.soDienThoai = "";
    //   return check;
    // }

    return check;
  }

  onHinhThucThanhToanChange(value: string) {
    if (value == "1")
      this.donhang.phuongThucThanhToan = PhuongThucThanhToan.TIEN_MAT;
    else {
      this.donhang.phuongThucThanhToan = PhuongThucThanhToan.CHUYEN_KHOAN;
    }
  }

  deleteThuoc(index: number) {
    this.chiTietDonHangLst.splice(index, 1);
  }

  save() {
    this.donhang.chiTietDonHangs = []; // Khởi tạo mảng rỗng

    this.chiTietDonHangLst.forEach((item: ChiTietDonHang) => {
      // Tạo đối tượng mới dựa trên item
      let temp: ChiTietDonHang = {
        donGia: item.donGia,
        soLuong: item.soLuong,
        thuocId: item.thuoc?.id,
        id: item.id,
        donhangId: item.donhangId,
      };

      // Đẩy đối tượng vào mảng chiTietPhieuNhaps
      if (this.donhang.chiTietDonHangs) {
        this.donhang.chiTietDonHangs.push(temp);
      }
    });

    if (this.check(this.donhang)) {
      if (!this.donhang.id) {
        this.donhangService.create(this.donhang).subscribe((resp) => {
          if (resp.status == CommonConstant.STATUS_OK_200) {
            this.toastService.success("Lưu thành công");
            this.router.navigate(["/sys/phieunhap"]);
          } else if (resp.status == CommonConstant.STATUS_OK_409) {
            this.toastService.error(resp.msg);
          } else {
            this.toastService.error("Lưu thất bại");
          }
        });
      } else {
        this.phieunhapService.update(this.donhang).subscribe((resp) => {
          if (resp.status == CommonConstant.STATUS_OK_200) {
            this.toastService.success("Cập nhật thành công");
            this.router.navigate(["/sys/phieunhap"]);
          } else if (resp.status == CommonConstant.STATUS_OK_409) {
            this.toastService.error(resp.msg);
          } else {
            this.toastService.error("Cập nhật thất bại");
          }
        });
      }
    }
  }
}
