import { ChucNang } from "./../../../_model/chucnang";
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
import { ChucNangService } from "src/app/_service/chucnang.service";
import { DanhmucThuocService } from "src/app/_service/danhmucthuoc.service";
import { LoaithuocService } from "src/app/_service/loaithuoc.service";

@Component({
  selector: "app-chucnang",
  templateUrl: "./chucnang.component.html",
  providers: [ConfirmationService, MessageService],
})
export class ChucNangComponent implements OnInit {
  constructor(
    private chucnangService: ChucNangService,
    private toastService: ToastrService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  chucNangLst: ChucNang[] = [];
  chucNangNew: ChucNang = {};
  chucNangDelete: ChucNang = {};

  modelSearch: SearchModel = {
    keyWord: "",
    id: 0,
    currentPage: 0,
    size: 10,
    sortedField: "",
  };

  totalRow: number = 0;

  displayDialog: boolean = false;

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.chucnangService.getLst(this.modelSearch).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        this.chucNangLst = res.data;
        this.totalRow = res.data.totalElements;
      }
    });
  }

  search() {
    this.getData();
  }

  preAdd() {
    this.displayDialog = true;
  }
  preUpdate(chucnang: ChucNang) {
    this.displayDialog = true;
    this.chucNangNew = chucnang;
  }

  handleCancel(displayDialog: boolean) {
    this.displayDialog = displayDialog;
    this.chucNangNew = {};
    this.getData();
  }

  handeSave(chucnang: ChucNang) {
    if (!chucnang.id) {
      this.chucnangService.create(chucnang).subscribe((resp) => {
        if (resp.status == CommonConstant.STATUS_OK_200) {
          this.toastService.success("Lưu thành công");
          this.getData();
        } else {
          this.toastService.error("Lưu thất bại");
        }
      });
    } else {
      this.chucnangService.update(chucnang).subscribe((resp) => {
        if (resp.status == CommonConstant.STATUS_OK_200) {
          this.toastService.success("Cập nhật thành công");
          this.getData();
        } else {
          this.toastService.error("Cập nhật thất bại");
        }
      });
    }
  }

  delete(chucnang: ChucNang) {
    this.chucnangService.delete(chucnang.id).subscribe((resp) => {
      if (resp.status == CommonConstant.STATUS_OK_200) {
        this.toastService.success("Xóa thành công");
        this.getData();
      } else {
        this.toastService.error("Xóa thất bại");
      }
    });
  }

  preDelete(chucnang: ChucNang) {
    this.confirmationService.confirm({
      message: "Bạn có chắc muốn xóa chức năng này?",
      header: "Xác nhận xóa chức năng",
      icon: "pi pi-info-circle",
      accept: () => {
        this.delete(chucnang);
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
