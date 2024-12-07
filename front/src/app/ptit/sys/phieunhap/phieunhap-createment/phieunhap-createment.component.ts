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

declare var $: any;

@Component({
  selector: "app-phieunhap-createment",
  templateUrl: "./phieunhap-createment.component.html",
})
export class PhieuNhapCreatementComponent implements OnInit {
  constructor(
    public translate: TranslateService,
    private nguoidungService: NguoidungService,
    private nccService: NCCService
  ) {}

  nguoidungHoten: string = "";

  @Input()
  phieunhap: PhieuNhap = {};

  @Output()
  save: EventEmitter<any> = new EventEmitter();

  @Output()
  cancel: EventEmitter<any> = new EventEmitter();

  @Input()
  chiTietPhieuNhapLst: ChiTietPhieuNhap[] = [];

  nccLst: NhaCungCap[] = [];

  displayModal: boolean = true;

  userInfo: NguoiDung = {};

  modelSearchNCC: SearchModel = {
    keyWord: "",
    id: 0,
    currentPage: 0,
    size: 10,
    sortedField: "",
  };

  addThuoc() {
    const thanhPhanThuocNew = {
      id: "",
      donGia: "",
      soLuong: "",
      thuocId: "",
    };
    this.chiTietPhieuNhapLst.push(thanhPhanThuocNew);
  }

  ngOnInit() {
    this.addThuoc();
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

  onCancel() {
    this.cancel.emit(false);
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

  onSave() {
    if (this.check(this.phieunhap)) {
      this.displayModal = false;
      this.save.emit(this.phieunhap);
    }
  }

  onNCChange(value: string) {
    this.phieunhap.nhaCungCapId = value;
  }
}
