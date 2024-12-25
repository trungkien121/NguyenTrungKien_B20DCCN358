import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { jwtDecode } from "jwt-decode";
import { Cookie } from "ng2-cookies";
import { ToastrService } from "ngx-toastr";
import { ConfirmationService, MessageService } from "primeng/api";
import { lastValueFrom } from "rxjs";
import { AuthConstant } from "src/app/_constant/auth.constant";
import { CommonConstant } from "src/app/_constant/common.constants";
import { PhuongThucThanhToan } from "src/app/_constant/phuongthucthanhtoan.constant";
import { TrangThaiGiaoHang } from "src/app/_constant/trangthaigioahang.constant";
import { TrangThaiThanhToan } from "src/app/_constant/trangthaithanhtoan.constant";
import { NguoiDung } from "src/app/_model/auth/nguoidung";
import { ChiTietDonHang } from "src/app/_model/chitietdonhang";
import { OptionSelect } from "src/app/_model/common/Option";
import { SearchModel } from "src/app/_model/common/Search";
import { DonHang } from "src/app/_model/hoadon";
import { NhaCungCap } from "src/app/_model/ncc";
import { Thuoc } from "src/app/_model/thuoc";
import { TuongTacThuoc } from "src/app/_model/tuongTacThuoc";
import { NguoidungService } from "src/app/_service/auth/nguoidung.service";
import { DonhangService } from "src/app/_service/donhang.service";
import { NCCService } from "src/app/_service/ncc.service";
import { PhieuNhapService } from "src/app/_service/phieunhap.service";
import { TuongTacThuocService } from "src/app/_service/tuongtacthuoc.service";

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
    private tuongTacThuocService: TuongTacThuocService,
    private toastService: ToastrService,
    private router: Router
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
    size: 100,
    sortedField: "",
  };

  listTuongTacThuoc: TuongTacThuoc[] = [];

  phuongThucThanhToanLst: OptionSelect[] = [];

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

    this.addTuongTacThuoc();
    this.getTuongTacThuocApi();
  }

  addTuongTacThuoc() {
    // Duyệt qua thuocSelected và thêm các tương tác vào listTuongTacThuoc

    if (this.thuocSelected.length >= 2) {
      this.listTuongTacThuoc = [];

      for (let i = 0; i < this.thuocSelected.length; i++) {
        for (let j = i + 1; j < this.thuocSelected.length; j++) {
          const thuoc1 = this.thuocSelected[i];
          const thuoc2 = this.thuocSelected[j];

          // Kiểm tra thanhPhanThuoc của từng thuốc
          if (thuoc1.thanhPhanThuocs && thuoc2.thanhPhanThuocs) {
            for (const thanhPhan1 of thuoc1.thanhPhanThuocs) {
              for (const thanhPhan2 of thuoc2.thanhPhanThuocs) {
                // Tạo đối tượng TuongTacThuoc
                const tuongTac: TuongTacThuoc = {
                  id: undefined, // ID sẽ được backend tự sinh nếu cần
                  hoatChat1: thanhPhan1.tenThanhPhan, // Ví dụ sử dụng thuộc tính tên hoạt chất
                  hoatChat2: thanhPhan2.tenThanhPhan,
                  coChe: "", // Thêm cơ chế (nếu có logic)
                  hauQua: "", // Thêm hậu quả (nếu có logic)
                  xuTri: "", // Thêm cách xử lý (nếu có logic)
                  thuoc1,
                  thuoc2,
                };

                // Thêm vào danh sách tương tác
                this.listTuongTacThuoc.push(tuongTac);
              }
            }
          }
        }
      }
    } else {
      console.warn("Chọn ít nhất 2 thuốc để tạo danh sách tương tác.");
      this.listTuongTacThuoc = [];
    }
  }

  getTuongTacThuocApi() {
    let data: TuongTacThuoc[] = []
    this.listTuongTacThuoc.forEach((item: TuongTacThuoc) => {
      this.tuongTacThuocService.get(item).subscribe((res) => {
        if (res.status == CommonConstant.STATUS_OK_200) {
          item.id = res.data.id;
          item.hoatChat2 = res.data.hoatChat2;
          item.hoatChat1 = res.data.hoatChat1;
          item.coChe = res.data.coChe;
          item.hauQua = res.data.hauQua;
          item.xuTri = res.data.xuTri;

          data.push(item)
        } else if (res.status == CommonConstant.STATUS_OK_404) {

        }
      });
    });

    this.listTuongTacThuoc = data;
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

    this.phuongThucThanhToanLst = [
      {
        value: PhuongThucThanhToan.CHUYEN_KHOAN,
        name: "Chuyển khoản",
      },
      {
        value: PhuongThucThanhToan.TIEN_MAT,
        name: "Tiền mặt",
      },
    ];
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
    if (value == PhuongThucThanhToan.TIEN_MAT)
      this.donhang.phuongThucThanhToan = PhuongThucThanhToan.TIEN_MAT;
    else {
      this.donhang.phuongThucThanhToan = PhuongThucThanhToan.CHUYEN_KHOAN;
    }
  }

  deleteThuoc(index: number) {
    this.chiTietDonHangLst.splice(index, 1);
    this.thuocSelected.splice(index, 1);

    this.addTuongTacThuoc();
    this.getTuongTacThuocApi();
  }

  save() {
    this.donhang.chiTietDonHangs = []; // Khởi tạo mảng rỗng

    this.chiTietDonHangLst.forEach((item: ChiTietDonHang) => {
      // Tạo đối tượng mới dựa trên item
      let temp: ChiTietDonHang = {
        donGia: item.thuoc?.giaBan,
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
    this.donhang.trangThaiThanhToan = TrangThaiThanhToan.DA_THANH_TOAN;
    this.donhang.trangThaiGiaoHang = TrangThaiGiaoHang.DA_GIAO;

    console.log("donhang", this.donhang);

    if (this.check(this.donhang)) {
      if (!this.donhang.id) {
        this.donhangService.create(this.donhang).subscribe((resp) => {
          if (resp.status == CommonConstant.STATUS_OK_200) {
            this.toastService.success("Lưu thành công");
            this.router.navigate(["/sys/donhang"]);
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
            this.router.navigate(["/sys/donhang"]);
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
