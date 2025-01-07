import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonConstant } from "src/app/_constant/common.constants";
import { SearchModel } from "src/app/_model/common/Search";
import { LoaiThuoc } from "src/app/_model/loaithuoc";
import { Thuoc } from "src/app/_model/thuoc";
import { LoaithuocService } from "src/app/_service/loaithuoc.service";
import { ThuocService } from "src/app/_service/thuoc.service";
import { Cookie } from "ng2-cookies";
import { AuthConstant } from "src/app/_constant/auth.constant";
import { GioHangChiTiet } from "src/app/_model/giohangchitiet";
import { GioHang } from "src/app/_model/giohang";
import { ToastrService } from "ngx-toastr";
import { GioHangService } from "./../../../_service/giohang.service";
import { NguoiDung } from "src/app/_model/auth/nguoidung";
import { jwtDecode } from "jwt-decode";
import { lastValueFrom } from "rxjs";
import { NguoidungService } from "src/app/_service/auth/nguoidung.service";
import { DanhMucThuoc } from "src/app/_model/danhmucthuoc";
import { DoiTuong } from "src/app/_model/doituong";
import { DoituongService } from "src/app/_service/doituong.service";
import { NhaSanXuat } from "src/app/_model/nsx";
import { NSXService } from "src/app/_service/nsx.service";

@Component({
  selector: "app-thuoctuloaithuoc",
  templateUrl: "./thuoctuloaithuoc.component.html",
  styleUrls: ["./thuoctuloaithuoc.component.css"],
})
export class ThuocTuLoaiThuocComponent implements OnInit {
  loaiThuocLst: LoaiThuoc[] = [];

  loaiThuoc: string = ""; // Biến để lưu tên loại thuốc
  dsThuoc: Thuoc[] = []; // Biến lưu danh sách thuốc theo loại
  // dsThuoc1: Thuoc[]=[];
  selectedItem: DanhMucThuoc | null = null;

  gioHangId: number = 0;
  userInfo: NguoiDung = {};
  doiTuong: DoiTuong[] = [];
  nhaSanXuat: NhaSanXuat[] = [];

  modelSearch: SearchModel = {
    keyWord: "",
    id: 0,
    currentPage: 0,
    size: 100,
    sortedField: "",
    loaiThuoc: "",
    tenDoiTuong: null,
    nhaSanXuat: null,
    maxGiaBan: 0,
    minGiaBan: 0,
  };

  totalRows: number = 0;
  giaBan = [
    {
      label: "Dưới 100.000đ",
      value: "under100",
      maxGiaBan: 100000,
      minGiaBan: 0,
    },
    {
      label: "100.000đ đến 300.000đ",
      value: "100to300",
      maxGiaBan: 300000,
      minGiaBan: 100000,
    },
    {
      label: "300.000đ đến 500.000đ",
      value: "300to500",
      maxGiaBan: 500000,
      minGiaBan: 300000,
    },
    {
      label: "Trên 500.000đ",
      value: "above500",
      maxGiaBan: null,
      minGiaBan: 500000,
    },
  ];

  selectedPriceRange: string = "";

  constructor(
    private thuocService: ThuocService,
    private router: Router,
    private route: ActivatedRoute,
    private gioHangService: GioHangService,
    private nguoidungService: NguoidungService,
    private doiTuongService: DoituongService,
    private nsxService: NSXService,
    private toastService: ToastrService
  ) {}

  onLoaiThuocChange(value: string) {
    this.modelSearch.loaiThuoc = value;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      this.loaiThuoc = this.route.snapshot.paramMap.get("loaiThuoc") || ""; // Lấy tên loại thuốc từ tham số URL
      this.getThuocTheoLoai(); // Gọi hàm để lấy thuốc theo loại
      this.getUserInfo();
    });
    this.getDT();
    // this.getThuocTuDT();
    this.getNSX();
    // this.getThuoc();
  }

  search() {
    this.getThuocTheoLoai();
  }

  selectPriceRange(price: any) {
    this.selectedPriceRange = price.value;
    this.modelSearch.maxGiaBan = price.maxGiaBan;
    this.modelSearch.minGiaBan = price.minGiaBan;

    this.getThuocTuGia();
  }

  getThuocTheoLoai() {
    this.modelSearch.tenDoiTuong = null;
    this.modelSearch.nhaSanXuat = null;
    this.modelSearch.maxGiaBan = null;
    this.modelSearch.minGiaBan = null;

    this.modelSearch.loaiThuoc = this.loaiThuoc;
    this.thuocService.getProductLst(this.modelSearch).subscribe((res) => {
      if (res.status == "200") {
        this.dsThuoc = res.data.data; // Lưu danh sách thuốc vào biến dsThuoc
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

        if (
          this.userInfo.nhomQuyens?.some(
            (quyen) => quyen.id == AuthConstant.ROLE_ADMIN.toString()
          )
        ) {
        }
        if (this.userInfo.id) {
          this.getGH();
        }
      }
    }
  }

  getGH() {
    this.gioHangService.getGH(this.userInfo.id).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        if (res.data.id) {
          this.gioHangId = res.data.id;
        }
      }
    });
  }

  showDetail(thuoc: Thuoc) {
    this.router.navigate([`/thuoc-chitiet/${thuoc.id}`]);
  }

  addProductInCart(item: Thuoc): void {
    if (Cookie.check(AuthConstant.ACCESS_TOKEN_KEY)) {
      this.createGH(item);
    } else {
      this.router.navigate([`/login`]);
    }
  }

  createGH(item: Thuoc): void {
    let gioHang: GioHangChiTiet = {
      gioHangId: this.gioHangId,
      soLuong: 1,
      thuocId: Number(item.id),
      donGia: item.giaBan,
    };

    this.gioHangService.createGH(gioHang).subscribe((resp) => {
      if (resp.status == CommonConstant.STATUS_OK_200) {
        // this.toastService.success("Lưu thành công");
        // this.router.navigate([`/user/giohang`]);
        this.gioHangService.getGHSubject(this.userInfo.id).subscribe();
      } else {
        this.toastService.error("Lưu thất bại");
      }
    });
  }

  getDT() {
    this.doiTuongService.getDTLst().subscribe((res) => {
      if (res.status == "200") {
        this.doiTuong = res.data;
      }
    });
  }

  getNSX() {
    this.nsxService.getNSXLst(this.modelSearch).subscribe((res) => {
      if (res.status == "200") {
        this.nhaSanXuat = res.data;
      }
    });
  }

  getThuocTuDT(doiTuong: DoiTuong) {
    this.modelSearch.tenDoiTuong = doiTuong.tenDoiTuong;
    this.thuocService.getProductLst(this.modelSearch).subscribe((res) => {
      if (res.status == "200") {
        this.dsThuoc = res.data.data;
      }
    });
  }

  getThuocTuNSX(nhaSanXuat: NhaSanXuat) {
    this.modelSearch.nhaSanXuat = nhaSanXuat.tenNhaSanXuat;
    this.thuocService.getProductLst(this.modelSearch).subscribe((res) => {
      if (res.status == "200") {
        this.dsThuoc = res.data.data;
      }
    });
  }

  // getThuoc() {
  //   this.thuocService.getProduct(this.modelSearch).subscribe((res) => {
  //     if (res.status == "200") {
  //       this.thuoc = res.data;
  //       console.log(res);
  //     }
  //   });
  // }
  getThuocTuGia() {
    // this.modelSearch.maxGiaBan = this.thuocService
    this.thuocService.getProductLst(this.modelSearch).subscribe((res) => {
      if (res.status == "200") {
        this.dsThuoc = res.data.data;
      }
    });
  }
}
