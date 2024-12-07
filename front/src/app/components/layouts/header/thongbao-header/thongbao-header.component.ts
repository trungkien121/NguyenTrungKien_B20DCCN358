import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { CommonConstant } from "src/app/_constant/common.constants";
import { ThongBao } from "src/app/_model/thongbao";
import { ThongBaoService } from "src/app/_service/thongbao.service";

@Component({
  selector: "app-thongbao-header",
  templateUrl: "./thongbao-header.component.html",
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

  ngOnInit() {
    // Lấy danh sách thông báo
    // this.thongbaoService.getTBSubject().subscribe((notis: any) => {
    //   this.lstNoti = notis.lst;
    //   this.countUnRead = notis.countUnread;
    //   this.countTotal = notis.count;

    //   // localStorage.setItem("notis", JSON.stringify(notis));

    //   //   if (this.lstNoti) {
    //   //     this.lstNoti.forEach((noti) => {
    //   //       noti.timeSendAgo = DateDiffUtil.getTimeDifference(
    //   //         noti.regDt,
    //   //         new Date()
    //   //       );
    //   //     });
    //   //   }
    // });

    // Gọi hàm getNotist() để lấy dữ liệu từ server
    this.thongbaoService.getLst({}).subscribe();
  }

  showAllNotification() {
    let params: { tab?: string } = {};

    params["tab"] = CommonConstant.TAB_NOTI;
    this.router.navigate(["/user/profile"], { queryParams: params });
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
