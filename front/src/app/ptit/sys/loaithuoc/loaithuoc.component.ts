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
  selector: "app-loaithuoc",
  templateUrl: "./loaithuoc.component.html",
  providers: [ConfirmationService, MessageService],
})
export class LoaiThuocComponent implements OnInit {
  constructor(
    private loaithuocService: LoaithuocService,
    private toastService: ToastrService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  loaithuocLst: LoaiThuoc[] = [];
  loaithuocNew: LoaiThuoc = {};
  loaithuocDelete: LoaiThuoc = {};

  modelSearch: SearchModel = {
    keyWord: "",
    id: 0,
    currentPage: 0,
    size: 100,
    sortedField: "",
    tenLoai: "",
  };

  totalRow: number = 0;

  displayDialog: boolean = false;

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loaithuocService.getLoaiThuocLst(this.modelSearch).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        this.loaithuocLst = res.data;
        this.totalRow = res.data.totalElements;
      }
    });
  }

  search() {
    if (this.modelSearch.tenLoai) {
      this.loaithuocService
        .getLoaiThuocLst2(this.modelSearch.tenLoai)
        .subscribe((res) => {
          if (res.status == CommonConstant.STATUS_OK_200) {
            this.loaithuocLst = res.data;
            this.totalRow = res.data.totalElements;
          } else {
            this.loaithuocLst = [];
            this.totalRow = 0;
          }
        });
    } else {
      this.getData();
    }
  }

  preAdd() {
    this.displayDialog = true;
  }
  preUpdate(loaithuoc: LoaiThuoc) {
    this.displayDialog = true;
    this.loaithuocNew = loaithuoc;
  }

  handleCancel(displayDialog: boolean) {
    this.displayDialog = displayDialog;
    this.loaithuocNew = {};
    this.getData();
  }

  handeSave(loaithuoc: LoaiThuoc) {
    if (!loaithuoc.id) {
      this.loaithuocService.createLoaiThuoc(loaithuoc).subscribe((resp) => {
        if (resp.status == CommonConstant.STATUS_OK_201) {
          this.toastService.success("Lưu thành công");
          this.getData();
        } else {
          this.toastService.error("Lưu thất bại");
        }
      });
    } else {
      this.loaithuocService.updateLoaiThuoc(loaithuoc).subscribe((resp) => {
        if (resp.status == CommonConstant.STATUS_OK_200) {
          this.toastService.success("Cập nhật thành công");
          this.getData();
        } else {
          this.toastService.error("Cập nhật thất bại");
        }
      });
    }
  }

  delete(loaithuoc: LoaiThuoc) {
    this.loaithuocService.deleteLoaiThuoc(loaithuoc.id).subscribe((resp) => {
      if (resp.status == CommonConstant.STATUS_OK_200) {
        this.toastService.success("Xóa thành công");
        this.getData();
      } else {
        this.toastService.error("Xóa thất bại");
      }
    });
  }

  preDelete(loaithuoc: LoaiThuoc) {
    this.confirmationService.confirm({
      message: "Bạn có chắc muốn xóa loại thuốc này?",
      header: "Xác nhận xóa loại thuốc",
      icon: "pi pi-info-circle",
      accept: () => {
        this.delete(loaithuoc);
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
