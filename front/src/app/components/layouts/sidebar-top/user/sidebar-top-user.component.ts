import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { Router } from "@angular/router";
import { DanhmucThuocService } from "src/app/_service/danhmucthuoc.service";
import { DanhMucThuoc } from "src/app/_model/danhmucthuoc";
import { CommonConstant } from "src/app/_constant/common.constants";

@Component({
  selector: "app-sidebar-top-user",
  templateUrl: "./sidebar-top-user.component.html",
  styleUrls: ["./sidebar-top-user.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarTopUserComponent implements OnInit {
  dmThuocLst: DanhMucThuoc[] = [];
  selectedItem: DanhMucThuoc | null = null;

  constructor(
    private dmThuocService: DanhmucThuocService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getDanhMucAndLoaiThuoc();
  }

  getDanhMucAndLoaiThuoc(): void {
    this.dmThuocService.getDanhMucAndLoaiThuoc().subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        this.dmThuocLst = res.data;
        this.cdr.markForCheck();
      }
    });
  }

  showAllItems(loaiThuoc: { tenLoai: string }): void {
    this.router.navigate([`/thuoctuloaithuoc/${loaiThuoc.tenLoai}`]);
  }
}
