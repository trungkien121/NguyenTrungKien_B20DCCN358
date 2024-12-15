import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { CommonConstant } from "src/app/_constant/common.constants";
import { SearchModel } from "src/app/_model/common/Search";
import { ThongBao } from "src/app/_model/thongbao";
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

  lstNoti: ThongBao[] = [];
  countUnRead: number = 0;
  countTotal: number = 0;

  modelSearch: SearchModel = {
    keyWord: "",
    id: 0,
    currentPage: 0,
    size: 10,
    sortedField: "",
    loaiThuoc: "",
  };

  ngOnInit() {
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
