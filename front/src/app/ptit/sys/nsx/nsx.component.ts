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
import { NhaSanXuat } from "src/app/_model/nsx";
import { NCCService } from "src/app/_service/ncc.service";
import { NSXService } from "src/app/_service/nsx.service";

@Component({
  selector: "app-nsx",
  templateUrl: "./nsx.component.html",
  providers: [ConfirmationService, MessageService],
})
export class NSXComponent implements OnInit {
  constructor(
    private nsxService: NSXService,
    private toastService: ToastrService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  nsxLst: NhaSanXuat[] = [];
  nsxNew: NhaSanXuat = {};

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
    this.nsxService.getNSXLst(this.modelSearch).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        this.nsxLst = res.data;
      }
    });
  }

  search() {
    if(this.modelSearch.keyWord){
      this.nsxService.getNSXLst2(this.modelSearch.keyWord).subscribe((res) => {
        if (res.status == CommonConstant.STATUS_OK_200) {
          this.nsxLst = res.data;
        }
        else{
          this.nsxLst  = []
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
  preUpdate(ncc: NhaCungCap) {
    this.displayDialog = true;
    this.nsxNew = ncc;
  }

  handleCancel(displayDialog: boolean) {
    this.displayDialog = displayDialog;
    this.nsxNew = {};
    this.getData();
  }

  handeSave(nsx: NhaSanXuat) {
    if (!nsx.id) {
      this.nsxService.createNSX(nsx).subscribe((resp) => {
        if (resp.status == CommonConstant.STATUS_OK_201) {
          this.toastService.success("Lưu thành công");
          this.getData();
        } else {
          this.toastService.error("Lưu thất bại");
        }
      });
    } else {
      this.nsxService.updateNSX(nsx).subscribe((resp) => {
        if (resp.status == CommonConstant.STATUS_OK_200) {
          this.toastService.success("Cập nhật thành công");
          this.getData();
        } else {
          this.toastService.error("Cập nhật thất bại");
        }
      });
    }
  }

  delete(nsx: NhaSanXuat) {
    this.nsxService.deleteNSX(nsx.id).subscribe((resp) => {
      if (resp.status == CommonConstant.STATUS_OK_200) {
        this.toastService.success("Xóa thành công");
        this.getData();
      } else {
        this.toastService.error("Xóa thất bại");
      }
    });
  }

  preDelete(nsx: NhaSanXuat) {
    this.confirmationService.confirm({
      message: "Bạn có chắc muốn xóa nhà sản xuất này?",
      header: "Xác nhận xóa nhà sản xuất",
      icon: "pi pi-info-circle",
      accept: () => {
        this.delete(nsx);
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
