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
import { DoiTuong } from "src/app/_model/doituong";
import { LoaiThuoc } from "src/app/_model/loaithuoc";
import { DanhmucThuocService } from "src/app/_service/danhmucthuoc.service";
import { DoituongService } from "src/app/_service/doituong.service";
import { LoaithuocService } from "src/app/_service/loaithuoc.service";

@Component({
  selector: "app-doituong",
  templateUrl: "./doituong.component.html",
  providers: [ConfirmationService, MessageService],
})
export class DoituongComponent implements OnInit {
  constructor(
    private doituongService: DoituongService,
    private toastService: ToastrService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  doituongLst: DoiTuong[] = [];
  doituongNew: DoiTuong = {};
  doituongDelete: DoiTuong = {};

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
    this.doituongService.getDTLst(this.modelSearch).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        this.doituongLst = res.data;
        this.totalRow = res.data.totalElements;
      }
    });
  }

  search() {
    if(this.modelSearch.keyWord){
      this.doituongService.getDTLst2(this.modelSearch.keyWord).subscribe((res: any) => {
        if (res.status == CommonConstant.STATUS_OK_200) {
          this.doituongLst = res.data;
          this.totalRow = res.data.totalElements;
        }     else{
          this.doituongLst  = []
          this.totalRow = 0;


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
  preUpdate(doituong: DoiTuong) {
    this.displayDialog = true;
    this.doituongNew = doituong;
  }

  handleCancel(displayDialog: boolean) {
    this.displayDialog = displayDialog;
    this.doituongNew = {};
    this.getData();
  }

  handeSave(doituong: DoiTuong) {
    if (!doituong.id) {
      this.doituongService.createDT(doituong).subscribe((resp) => {
        if (resp.status == CommonConstant.STATUS_OK_200) {
          this.toastService.success("Lưu thành công");
          this.getData();
        } else {
          this.toastService.error("Lưu thất bại");
        }
      });
    } else {
      this.doituongService.updateDT(doituong).subscribe((resp) => {
        if (resp.status == CommonConstant.STATUS_OK_200) {
          this.toastService.success("Cập nhật thành công");
          this.getData();
        } else {
          this.toastService.error("Cập nhật thất bại");
        }
      });
    }
  }

  delete(doituong: DoiTuong) {
    this.doituongService.deleteDT(doituong.id).subscribe((resp) => {
      if (resp.status == CommonConstant.STATUS_OK_200) {
        this.toastService.success("Xóa thành công");
        this.getData();
      } else {
        this.toastService.error("Xóa thất bại");
      }
    });
  }

  preDelete(doituong: DoiTuong) {
    this.confirmationService.confirm({
      message: "Bạn có chắc muốn xóa đối tượng này?",
      header: "Xác nhận xóa đối tượng",
      icon: "pi pi-info-circle",
      accept: () => {
        this.delete(doituong);
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
