import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
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
import { PhieuNhap } from "src/app/_model/phieunhap";
import { TonKho } from "src/app/_model/tonkho";
import { NCCService } from "src/app/_service/ncc.service";
import { PhieuNhapService } from "src/app/_service/phieunhap.service";
import { TonKhoService } from "src/app/_service/tonkho.service";

@Component({
  selector: "app-tonkho",
  templateUrl: "./tonkho.component.html",
  providers: [ConfirmationService, MessageService],
})
export class TonKhoComponent implements OnInit {
  constructor(
    private tonkhoService: TonKhoService,
    private toastService: ToastrService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  tonkhoLst: TonKho[] = [];
  phieunhapNew: PhieuNhap = {};
  phieunhapDelete: PhieuNhap = {};

  modelSearch: SearchModel = {
    tenThuoc: "",
    soLo: "",
    tenNhaSanXuat: "",
    id: 0,
    currentPage: 0,
    size: 100,
    sortedField: "",
  };

  displayDialog: boolean = false;

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.tonkhoService.getLst(this.modelSearch).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        this.tonkhoLst = res.data.data;
        console.log(this.tonkhoLst);
      }
    });
  }

  search() {
    this.getData();
  }

  preAdd() {
    this.displayDialog = true;
  }
  preUpdate(model: PhieuNhap) {
    this.router.navigate([`/sys/phieunhap-create/${model.id}`]);
  }

  handleCancel(displayDialog: boolean) {
    this.displayDialog = displayDialog;
    this.phieunhapNew = {};
    this.getData();
  }

  //   handeSave(model: PhieuNhap) {
  //     if (!model.id) {
  //       this.phieunhapService.create(model).subscribe((resp) => {
  //         if (resp.status == CommonConstant.STATUS_OK_201) {
  //           this.toastService.success("Lưu thành công");
  //           this.getData();
  //         } else if (resp.status == CommonConstant.STATUS_OK_409) {
  //           this.toastService.error(resp.msg);
  //           this.getData();
  //         } else {
  //           this.toastService.error("Cập nhật thất bại");
  //         }
  //       });
  //     } else {
  //       this.phieunhapService.update(model).subscribe((resp) => {
  //         if (resp.status == CommonConstant.STATUS_OK_200) {
  //           this.toastService.success("Cập nhật thành công");
  //           this.getData();
  //         } else if (resp.status == CommonConstant.STATUS_OK_409) {
  //           this.toastService.error(resp.msg);
  //           this.getData();
  //         } else {
  //           this.toastService.error("Cập nhật thất bại");
  //         }
  //       });
  //     }
  //   }
}
