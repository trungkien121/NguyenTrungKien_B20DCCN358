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
    private dmThuocService: DanhmucThuocService
  ) {}

  dmThuocLst: DanhMucThuoc[] = [];

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
    this.dmThuocService.getDMTLst(this.modelSearch).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        this.dmThuocLst = res.data;
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
