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
import { NCCService } from "src/app/_service/ncc.service";
import { PhieuNhapService } from "src/app/_service/phieunhap.service";

@Component({
  selector: "app-phieunhap",
  templateUrl: "./phieunhap.component.html",
  providers: [ConfirmationService, MessageService],
})
export class PhieuNhapComponent implements OnInit {
  constructor(
    private phieunhapService: PhieuNhapService,
    private toastService: ToastrService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  phieunhapLst: PhieuNhap[] = [];
  phieunhapNew: PhieuNhap = {};
  phieunhapDelete: PhieuNhap = {};

  modelSearch: SearchModel = {
    keyWord: "",
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
    this.phieunhapService.getLst(this.modelSearch).subscribe((res) => {
      //   if (res.status == CommonConstant.STATUS_OK_200) {
      this.phieunhapLst = res.data.data;
      console.log("res", res);

      console.log("phieunhap", this.phieunhapLst);
      //   }
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

  handeSave(model: PhieuNhap) {
    if (!model.id) {
      this.phieunhapService.create(model).subscribe((resp) => {
        if (resp.status == CommonConstant.STATUS_OK_201) {
          this.toastService.success("Lưu thành công");
          this.getData();
        } else if (resp.status == CommonConstant.STATUS_OK_409) {
          this.toastService.error(resp.msg);
          this.getData();
        } else {
          this.toastService.error("Cập nhật thất bại");
        }
      });
    } else {
      this.phieunhapService.update(model).subscribe((resp) => {
        if (resp.status == CommonConstant.STATUS_OK_200) {
          this.toastService.success("Cập nhật thành công");
          this.getData();
        } else if (resp.status == CommonConstant.STATUS_OK_409) {
          this.toastService.error(resp.msg);
          this.getData();
        } else {
          this.toastService.error("Cập nhật thất bại");
        }
      });
    }
  }

  delete(model: PhieuNhap) {
    this.phieunhapService.delete(model.id).subscribe((resp) => {
      if (resp.status == CommonConstant.STATUS_OK_200) {
        this.toastService.success("Xóa thành công");
        this.getData();
      } else {
        this.toastService.error("Xóa thất bại");
      }
    });
  }

  preDelete(model: PhieuNhap) {
    this.confirmationService.confirm({
      message: "Bạn có chắc muốn xóa phiếu nhập này?",
      header: "Xác nhận xóa phiếu nhập",
      icon: "pi pi-info-circle",
      accept: () => {
        this.delete(model);
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: "error",
              summary: "Rejected",
              detail: "You have rejected",
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: "warn",
              summary: "Cancelled",
              detail: "You have cancelled",
            });
            break;
        }
      },
    });
  }
}
