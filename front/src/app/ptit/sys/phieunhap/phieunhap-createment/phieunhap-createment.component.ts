import { PhieuNhapService } from "src/app/_service/phieunhap.service";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { jwtDecode } from "jwt-decode";
import { Cookie } from "ng2-cookies";
import { PrimeNGConfig } from "primeng/api";
import { lastValueFrom } from "rxjs";
import { AuthConstant } from "src/app/_constant/auth.constant";
import { CommonConstant } from "src/app/_constant/common.constants";
import { NguoiDung } from "src/app/_model/auth/nguoidung";
import { ChiTietPhieuNhap } from "src/app/_model/chitietphieunhap";
import { SearchModel } from "src/app/_model/common/Search";
import { LoaiThuoc } from "src/app/_model/loaithuoc";
import { NhaCungCap } from "src/app/_model/ncc";
import { PhieuNhap } from "src/app/_model/phieunhap";
import { Thuoc } from "src/app/_model/thuoc";
import { NguoidungService } from "src/app/_service/auth/nguoidung.service";
import { NCCService } from "src/app/_service/ncc.service";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";

declare var $: any;

@Component({
  selector: "app-phieunhap-createment",
  templateUrl: "./phieunhap-createment.component.html",
})
export class PhieuNhapCreatementComponent implements OnInit {
  constructor(
    public translate: TranslateService,
    private nguoidungService: NguoidungService,
    private phieunhapService: PhieuNhapService,
    private toastService: ToastrService,
    private router: Router,
    private nccService: NCCService,
    private route: ActivatedRoute
  ) {}

  nguoidungHoten: string = "";

  phieunhap: PhieuNhap = {};

  @Input()
  chiTietPhieuNhapLst: ChiTietPhieuNhap[] = [];

  nccLst: NhaCungCap[] = [];

  displayDialog: boolean = false;

  userInfo: NguoiDung = {};

  thuocSelected: Thuoc[] = [];

  modelSearchNCC: SearchModel = {
    keyWord: "",
    id: 0,
    currentPage: 0,
    size: 10,
    sortedField: "",
  };

  openSelectThuoc() {
    this.thuocSelected = [];
    this.chiTietPhieuNhapLst.forEach((item) => {
      if (item.thuoc) this.thuocSelected.push(item.thuoc);
    });

    this.displayDialog = true;
  }

  handleCancel(displayDialog: boolean) {
    this.displayDialog = displayDialog;
    // this.courseNew = {};
  }
  handleSaveThuoc(thuocSelected: Thuoc[]) {
    // console.log("selected", thuocSelected);
    this.thuocSelected = thuocSelected;

    this.chiTietPhieuNhapLst = [];
    this.thuocSelected.forEach((item) => {
      this.chiTietPhieuNhapLst.push({
        thuoc: item,
        donGia: item.giaNhap,
        soLuong: 0,
        thuocId: item.id,
      });
    });

    // console.log("chiTietPhieuNhapLst", this.chiTietPhieuNhapLst);

    // this.applyScoreCard(scoreCard, this.typeTestActiveTab);
  }

  addThuoc() {
    const thanhPhanThuocNew = {
      id: "",
      donGia: 0,
      soLuong: 0,
      thuocId: "",
    };
    this.chiTietPhieuNhapLst.push(thanhPhanThuocNew);
  }

  getPhieuNhapByParam() {
    this.route.queryParams.subscribe(async (params) => {
      this.phieunhap.id = this.route.snapshot.paramMap.get("id") || "";
      if (this.phieunhap.id) {
        this.getPhieuNhapById(this.phieunhap.id);
      }
    });
  }

  getPhieuNhapById(id: string) {
    this.phieunhapService.getPN(id).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        this.phieunhap = res.data;
        this.chiTietPhieuNhapLst = this.phieunhap
          .chiTietPhieuNhaps as ChiTietPhieuNhap[];
        this.phieunhap.nguoiDungId = this.phieunhap.nguoiDung?.id;
        this.phieunhap.nhaCungCapId = this.phieunhap.nhaCungCap?.id;

        if (this.phieunhap.createdAt) {
          const date = new Date(this.phieunhap.createdAt);
          this.phieunhap.createdAt = `${date.getFullYear()}-${(
            "0" +
            (date.getMonth() + 1)
          ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
        }
      }
    });
  }

  ngOnInit() {
    this.getPhieuNhapByParam();
    // this.addThuoc();
    this.getUserInfo();

    let newDate = new Date();
    const date = new Date(newDate);

    this.phieunhap.ngayNhap = `${date.getFullYear()}-${(
      "0" +
      (date.getMonth() + 1)
    ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;

    this.getNCC();
  }

  getNCC() {
    this.nccService.getNCCLst(this.modelSearchNCC).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        this.nccLst = res.data;
      }
    });
  }

  async getUserInfo(): Promise<void> {
    const _token = Cookie.get(AuthConstant.ACCESS_TOKEN_KEY);

    const userInfo = jwtDecode(_token) as NguoiDung;
    if (userInfo.id) {
      const resp = await lastValueFrom(this.nguoidungService.get(userInfo.id));
      if (resp.status == CommonConstant.STATUS_OK_200) {
        this.userInfo = resp.data;

        this.phieunhap.nguoiDungId = this.userInfo.id;
        this.phieunhap.nguoiDung = this.userInfo;
        this.nguoidungHoten = this.userInfo.hoTen || "";
      }
    }
  }

  check(model: PhieuNhap) {
    let check = true;

    // if (ncc.soDienThoai == undefined || ncc.soDienThoai.trim().length == 0) {
    //   check = false;
    //   this.ncc.soDienThoai = "";
    //   return check;
    // }

    return check;
  }

  onNCChange(value: string) {
    this.phieunhap.nhaCungCapId = value;
  }

  deleteThuoc(index: number) {
    this.chiTietPhieuNhapLst.splice(index, 1);
  }

  save() {
    this.phieunhap.chiTietPhieuNhaps = []; // Khởi tạo mảng rỗng

    this.chiTietPhieuNhapLst.forEach((item: ChiTietPhieuNhap) => {
      // Tạo đối tượng mới dựa trên item
      let temp: ChiTietPhieuNhap = {
        donGia: item.donGia,
        soLuong: item.soLuong,
        thuocId: item.thuoc?.id,
        id: item.id,
        phieuNhapId: item.phieuNhapId,
      };

      // Đẩy đối tượng vào mảng chiTietPhieuNhaps
      if (this.phieunhap.chiTietPhieuNhaps) {
        this.phieunhap.chiTietPhieuNhaps.push(temp);
      }
    });

    if (this.check(this.phieunhap)) {
      if (!this.phieunhap.id) {
        this.phieunhapService.create(this.phieunhap).subscribe((resp) => {
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
        this.phieunhapService.update(this.phieunhap).subscribe((resp) => {
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
