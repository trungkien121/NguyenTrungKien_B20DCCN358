import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from "primeng/api";
import { CommonConstant } from "src/app/_constant/common.constants";
import { SearchModel } from "src/app/_model/common/Search";
import { DanhMucThuoc } from "src/app/_model/danhmucthuoc";
import { LoaiThuoc } from "src/app/_model/loaithuoc";
import { DanhmucThuocService } from "src/app/_service/danhmucthuoc.service";
import { LoaithuocService } from "src/app/_service/loaithuoc.service";

@Component({
  selector: "app-thongke",
  styleUrls: ["./thongke.component.css"],
  templateUrl: "./thongke.component.html",
  providers: [ConfirmationService, MessageService],
})
export class ThongKecComponent implements OnInit {
  constructor(
    private toastService: ToastrService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}
}
