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
  selector: "app-ncc",
  templateUrl: "./ncc.component.html",
  providers: [ConfirmationService, MessageService],
})
export class NCCComponent implements OnInit {
  constructor(
    private nccService: NCCService,
    private toastService: ToastrService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  nccLst: NhaCungCap[] = [];
  nccNew: NhaCungCap = {};
  nccDelete: NhaCungCap = {};

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
    this.nccService.getNCCLst(this.modelSearch).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        this.nccLst = res.data;
      }
    });
  }

  search() {
    if(this.modelSearch.keyWord){

      this.nccService.getNCCLst2(this.modelSearch.keyWord).subscribe((res) => {
        if (res.status == CommonConstant.STATUS_OK_200) {
          this.nccLst = res.data;
        }
        else{
          this.nccLst  = []
        }
      });
    }
    else{
      this.getData();

    }
  }

  preAdd() {
    this.displayDialog = true;
  }
  preUpdate(ncc: NhaCungCap) {
    this.displayDialog = true;
    this.nccNew = ncc;
  }

  handleCancel(displayDialog: boolean) {
    this.displayDialog = displayDialog;
    this.nccNew = {};
    this.getData();
  }

  handeSave(ncc: NhaCungCap) {
    if (!ncc.id) {
      this.nccService.createNCC(ncc).subscribe((resp) => {
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
      this.nccService.updateNCC(ncc).subscribe((resp) => {
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

  delete(ncc: NhaCungCap) {
    this.nccService.deleteNCC(ncc.id).subscribe((resp) => {
      if (resp.status == CommonConstant.STATUS_OK_200) {
        this.toastService.success("Xóa thành công");
        this.getData();
      } else {
        this.toastService.error("Xóa thất bại");
      }
    });
  }

  preDelete(ncc: NhaCungCap) {
    this.confirmationService.confirm({
      message: "Bạn có chắc muốn xóa nhà cung cấp này?",
      header: "Xác nhận xóa nhà cung cấp",
      icon: "pi pi-info-circle",
      accept: () => {
        this.delete(ncc);
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
