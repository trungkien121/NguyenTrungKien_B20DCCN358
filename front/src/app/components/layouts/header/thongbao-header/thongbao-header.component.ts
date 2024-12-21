import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { jwtDecode } from "jwt-decode";
import { Cookie } from "ng2-cookies";
import { lastValueFrom, Subscription } from "rxjs";
import { AuthConstant } from "src/app/_constant/auth.constant";
import { CommonConstant } from "src/app/_constant/common.constants";
import { NguoiDung } from "src/app/_model/auth/nguoidung";
import { Quyen } from "src/app/_model/auth/quyen";
import { SearchModel } from "src/app/_model/common/Search";
import { ThongBao } from "src/app/_model/thongbao";
import { NguoidungService } from "src/app/_service/auth/nguoidung.service";
import { ThongBaoService } from "src/app/_service/thongbao.service";

@Component({
  selector: "app-thongbao-header",
  templateUrl: "./thongbao-header.component.html",
  styleUrls: ["./thongbao-header.component.css"],
})
export class ThongbaoHeaderComponent implements OnInit, OnDestroy {
  constructor(
    private thongbaoService: ThongBaoService,
    private cdr: ChangeDetectorRef,
    public router: Router
  ) {}

  subscriptions: Subscription[] = [];
  userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  lstNoti: ThongBao[] = [];
  countUnRead: number = 0;
  countTotal: number = 0;

  modelSearch: SearchModel = {
    keyWord: "",
    id: 0,
    currentPage: 0,
    size: 100,
    sortedField: "",
    loaiThuoc: "",
  };

  ngOnInit() {
    this.modelSearch.id = this.userInfo.id;
    this.thongbaoService.getLst(this.modelSearch).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        this.lstNoti = res.data.data;
        this.countTotal = res.data.totalElements;

        this.caculateUnRead();
      }
    });
  }

  caculateUnRead() {
    this.countUnRead = 0;
    this.lstNoti.forEach((noti: ThongBao) => {
      if (noti.trangThai == false) {
        this.countUnRead += 1;
      }
    });
  }
  showAllNotification() {
    let params: { tab?: string } = {};

    this.router.navigate(["/user/thongbao"], { queryParams: params });
  }

  updateNoti(thongbao: ThongBao) {
    this.thongbaoService.update(thongbao.id).subscribe((res) => {});
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
