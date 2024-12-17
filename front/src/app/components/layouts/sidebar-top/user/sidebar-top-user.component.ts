import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { Cookie } from "ng2-cookies";
import { AuthConstant } from "src/app/_constant/auth.constant";
import { Quyen } from "src/app/_model/auth/quyen";
import { lastValueFrom, Subscription } from "rxjs";
import { jwtDecode } from "jwt-decode";
import { NguoiDung } from "src/app/_model/auth/nguoidung";
import { NguoidungService } from "src/app/_service/auth/nguoidung.service";
import { CommonConstant } from "src/app/_constant/common.constants";
import { DanhmucThuocService } from "src/app/_service/danhmucthuoc.service";
import { DanhMucThuoc } from "src/app/_model/danhmucthuoc";
import { SearchModel } from "src/app/_model/common/Search";
import { LoaiThuoc } from "src/app/_model/loaithuoc";
import { LoaithuocService } from "src/app/_service/loaithuoc.service";

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
  };

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loaiThuocService.getLoaiThuocLst(this.modelSearch).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        this.loaiThuocLst = res.data;
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
