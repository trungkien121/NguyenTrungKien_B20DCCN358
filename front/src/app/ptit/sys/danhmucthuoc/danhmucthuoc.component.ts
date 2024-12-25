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
  selector: "app-danhmucthuoc",
  templateUrl: "./danhmucthuoc.component.html",
  providers: [ConfirmationService, MessageService],
})
export class DanhmucThuocComponent implements OnInit {
  constructor(
    private dmThuocService: DanhmucThuocService,
    private toastService: ToastrService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  dmThuocLst: DanhMucThuoc[] = [];
  dmThuocNew: DanhMucThuoc = {};
  dmThuocDelete: DanhMucThuoc = {};

  modelSearch: SearchModel = {
    keyWord: "",
    id: 0,
    currentPage: 0,
    size: 100,
    sortedField: "",
  };

  totalRow: number = 0;

  displayDialog: boolean = false;

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.dmThuocService.getDMTLst(this.modelSearch).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        this.dmThuocLst = res.data;
        this.totalRow = res.data.totalElements;
      }
    });
  }

  search() {
    if(this.modelSearch.keyWord){
      this.dmThuocService.getDMTLst2(this.modelSearch.keyWord).subscribe((res) => {
        if (res.status == CommonConstant.STATUS_OK_200) {
          this.dmThuocLst = res.data;
        }
        else{
          this.dmThuocLst  = []
        }
      });
    }

    else{
     this.getData()
    }
  }

  preAdd() {
    this.displayDialog = true;
  }
  preUpdate(loaithuoc: LoaiThuoc) {
    this.displayDialog = true;
    this.dmThuocNew = loaithuoc;
  }

  handleCancel(displayDialog: boolean) {
    this.displayDialog = displayDialog;
    this.dmThuocNew = {};
    this.getData();
  }

  handeSave(dmThuoc: DanhMucThuoc) {
    if (!dmThuoc.id) {
      this.dmThuocService.createDMT(dmThuoc).subscribe((resp) => {
        if (resp.status == CommonConstant.STATUS_OK_201) {
          this.toastService.success("Lưu thành công");
          this.getData();
        } else {
          this.toastService.error("Lưu thất bại");
        }
      });
    } else {
      this.dmThuocService.updateDMT(dmThuoc).subscribe((resp) => {
        if (resp.status == CommonConstant.STATUS_OK_200) {
          this.toastService.success("Cập nhật thành công");
          this.getData();
        } else {
          this.toastService.error("Cập nhật thất bại");
        }
      });
    }
  }

  delete(dmThuoc: DanhMucThuoc) {
    this.dmThuocService.deleteDMT(dmThuoc.id).subscribe((resp) => {
      if (resp.status == CommonConstant.STATUS_OK_200) {
        this.toastService.success("Xóa thành công");
        this.getData();
      } else {
        this.toastService.error("Xóa thất bại");
      }
    });
  }

  preDelete(dmThuoc: DanhMucThuoc) {
    this.confirmationService.confirm({
      message: "Bạn có chắc muốn xóa danh mục thuốc này?",
      header: "Xác nhận xóa danh mục thuốc",
      icon: "pi pi-info-circle",
      accept: () => {
        this.delete(dmThuoc);
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
