import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from "primeng/api";
import { CommonConstant } from "src/app/_constant/common.constants";
import { OptionSelect } from "src/app/_model/common/Option";
import { SearchModel } from "src/app/_model/common/Search";
import { NhaCungCap } from "src/app/_model/ncc";
import { NCCService } from "src/app/_service/ncc.service";

@Component({
  selector: "app-sys-thongbao",
  templateUrl: "./thongbao.component.html",
  styleUrls: ["./thongbao.component.css"],
  providers: [ConfirmationService, MessageService],
})
export class ThongBaoComponent implements OnInit {
  constructor(
    private nccService: NCCService,
    private toastService: ToastrService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }


}
