import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonConstant } from "src/app/_constant/common.constants";
import { NguoiDung } from "src/app/_model/auth/nguoidung";
import { ToastrService } from "ngx-toastr";
import { NguoidungService } from "src/app/_service/auth/nguoidung.service";
import { GioHangService } from "src/app/_service/giohang.service";
import { GioHangChiTiet } from "src/app/_model/giohangchitiet";
import { Cookie } from "ng2-cookies";
import { AuthConstant } from "src/app/_constant/auth.constant";
import { jwtDecode } from "jwt-decode";
import { lastValueFrom } from "rxjs";
import { DonHang } from "src/app/_model/hoadon";
import { ChiTietDonHang } from "src/app/_model/chitietdonhang";
import { Thuoc } from "src/app/_model/thuoc";
import { TrangThaiThanhToan } from "src/app/_constant/trangthaithanhtoan.constant";
import { TrangThaiGiaoHang } from "src/app/_constant/trangthaigioahang.constant";
import { DonhangService } from "src/app/_service/donhang.service";
import { ThongBaoService } from "src/app/_service/thongbao.service";
import { ThongBao } from "src/app/_model/thongbao";
import { LOAITHONGBAO } from "src/app/_constant/loaithongbao.constant";
import { PhuongThucThanhToan } from "src/app/_constant/phuongthucthanhtoan.constant";
import { SearchModel } from "src/app/_model/common/Search";
import { DanhMucThuoc } from "src/app/_model/danhmucthuoc";
import { LoaiThuoc } from "src/app/_model/loaithuoc";
import { NhaSanXuat } from "src/app/_model/nsx";
import { DoiTuong } from "src/app/_model/doituong";
import { ThanhPhanThuoc } from "src/app/_model/thanhphanthuoc";
import { OptionSelect } from "src/app/_model/common/Option";
import { ThuocService } from "src/app/_service/thuoc.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { DanhmucThuocService } from "src/app/_service/danhmucthuoc.service";
import { LoaithuocService } from "src/app/_service/loaithuoc.service";
import { NSXService } from "src/app/_service/nsx.service";

@Component({
  selector: "app-chitiet-donhang",
  templateUrl: "./chitiet-donhang.component.html",
  providers: [ConfirmationService, MessageService],
})
export class ChiTietDonHangComponent implements OnInit {
  donhang: DonHang = {};
  //   loaithuocLst: LoaiThuoc[] = [];
  //   nsxLst: NhaSanXuat[] = [];
  //   danhmucLst: DanhMucThuoc[] = [];

  //   doituongSelected: DoiTuong[] = [];
  //   thanhPhanThuocLSt: ThanhPhanThuoc[] = [];

  modelSearch: SearchModel = {
    keyWord: "",
    id: 0,
    currentPage: 0,
    size: 10,
    sortedField: "",
  };

  statusOptions: any = {
    name: "",
    value: true,
  };
  categoryOption: OptionSelect[] = [];
  displayDialog: boolean = false;

  tongTien: number = 0;

  constructor(
    private thuocService: ThuocService,
    private donHangService: DonhangService,
    private loaithuocService: LoaithuocService,
    private nsxService: NSXService,
    private dmThuocService: DanhmucThuocService,
    private toastService: ToastrService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private nguoidungService: NguoidungService
  ) {}

  handleCancel(displayDialog: boolean) {
    this.displayDialog = displayDialog;
    // this.courseNew = {};
  }

  xacNhanDonHang() {
    this.donhang.trangThaiGiaoHang = TrangThaiGiaoHang.DANG_GIAO;
    this.donHangService.update(this.donhang).subscribe((resp) => {
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

  getDonHangByParam() {
    this.route.queryParams.subscribe(async (params) => {
      this.donhang.id = this.route.snapshot.paramMap.get("id") || "";
      if (this.donhang.id) {
        this.getDonHangById(this.donhang.id);
      }
    });
  }

  getDonHangById(id: string) {
    this.donHangService.get(id).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        this.donhang = res.data;

        if (this.donhang.chiTietDonHangs) {
          this.donhang.chiTietDonHangs.forEach((item: ChiTietDonHang) => {
            this.tongTien += (item.soLuong || 0) * (item.donGia || 0);
          });
        }
      }
    });
  }

  ngOnInit() {
    this.getDonHangByParam();

    this.statusOptions = [
      {
        name: "Đang bán",
        value: true,
      },
      {
        name: "Ngừng bán",
        value: false,
      },
    ];
  }

  search() {}
}
