import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { NguoiDung } from "src/app/_model/auth/nguoidung";
import { NguoidungService } from "src/app/_service/auth/nguoidung.service";
import { CommonConstant } from "src/app/_constant/common.constants";
import { DanhmucThuocService } from "src/app/_service/danhmucthuoc.service";
import { DanhMucThuoc } from "src/app/_model/danhmucthuoc";
import { SearchModel } from "src/app/_model/common/Search";
import { LoaiThuoc } from "src/app/_model/loaithuoc";
import { LoaithuocService } from "src/app/_service/loaithuoc.service";
import { Thuoc } from "src/app/_model/thuoc";
import { Router } from "@angular/router";
import { ThuocService } from "src/app/_service/thuoc.service";
import { GioHangService } from "src/app/_service/giohang.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-sidebar-top-user",
  templateUrl: "./sidebar-top-user.component.html",
  styleUrls: ["./sidebar-top-user.component.css"],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SidebarTopUserComponent implements OnInit {
  constructor(
    private nguoidungService: NguoidungService,
    private cdr: ChangeDetectorRef,
    private dmThuocService: DanhmucThuocService,
    private loaiThuocService: LoaithuocService,
    private router: Router,
    private thuocService: ThuocService,
    private gioHangService: GioHangService,
    private toastService: ToastrService
  ) {}

  // dmThuocLst: DanhMucThuoc[] = [];
  loaiThuocLst: LoaiThuoc[]=[];

  selectedItem: DanhMucThuoc | null = null;
  modelSearch: SearchModel = {
    keyWord: "",
    id: 0,
    currentPage: 0,
    size: 100,
    sortedField: "",
    loaiThuoc:""
  };

  totalRows: number = 0;
  gioHangId: number = 0;
  userInfo: NguoiDung = {};

  ngOnInit(): void {
    this.getData();

  }


  showAllItems(loaiThuoc: LoaiThuoc) {
    this.router.navigate([`user/thuoctuloaithuoc/${loaiThuoc.tenLoai}`]);
  }
  

  showDetail(thuoc: Thuoc) {
    console.log("thuoc", thuoc)
    this.router.navigate([`/thuoc-chitiet/${thuoc.id}`]);
  }

  getData() {
    this.loaiThuocService.getLoaiThuocLst(this.modelSearch).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        this.loaiThuocLst = res.data;
        for (let i = 0; i < 4; i++) {
          const loaiThuoc = this.loaiThuocLst[i];
          this.modelSearch.loaiThuoc=loaiThuoc.tenLoai;
          // this.getThuoc();
          this.thuocService.getProductLst(this.modelSearch).subscribe((res) => {
            // if (res.status == CommonConstant.STATUS_OK_200) {
            this.loaiThuocLst[i].dsThuoc = res.data.data;
            // }
          });
        }
      }
    });
  }   
  
    
  onMouseEnter(item: DanhMucThuoc) {
    this.selectedItem = item;
  }

  // Sự kiện khi chuột rời khỏi mục
  onMouseLeave() {
    this.selectedItem = null;
  }
}
