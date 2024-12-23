import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from "primeng/api";
import { CommonConstant } from "src/app/_constant/common.constants";
import { SearchModel } from "src/app/_model/common/Search";
import { DoiTuong } from "src/app/_model/doituong";
import { Thuoc } from "src/app/_model/thuoc";
import { DoituongService } from "src/app/_service/doituong.service";
import { ThuocService } from "src/app/_service/thuoc.service";

declare var $: any;

@Component({
  selector: "app-select-thuoc",
  templateUrl: "./select-thuoc.component.html",
  providers: [ConfirmationService, MessageService],
})
export class SelectThuocComponent implements OnInit {
  constructor(
    private doituongService: DoituongService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private toastService: ToastrService,
    private translate: TranslateService,
    private thuocService: ThuocService
  ) {}
  CommonConstant = CommonConstant;

  @Output()
  save: EventEmitter<any> = new EventEmitter();

  @Output()
  cancel: EventEmitter<any> = new EventEmitter();

  displayModal: boolean = true;
  //create đối tượng
  displayNewDialog: boolean = false;
  //delete  đối tượng
  displayConfirmDialog: boolean = false;

  doituongNew: DoiTuong = {};
  scoreCardDelete: DoiTuong = {};

  modelSearch: SearchModel = {
    size:1000,
  };
  @Input()
  thuocSelected: Thuoc[] = [];

  thuocLst: Thuoc[] = [];

  ngOnInit() {
    this.getThuoc();
  }
  search() {
    this.getThuoc();
  }

  getThuoc() {
    this.thuocService.getProductLst(this.modelSearch).subscribe((res) => {
      // if (res.status == CommonConstant.STATUS_OK_200) {
      this.thuocLst = res.data.data;
      
      // }
    });
  }
  onCancel() {
    this.cancel.emit(false);
  }

  check() {
    let check = true;
    if (!this.thuocSelected) {
      check = false;
    }
    return check;
  }

  onSave() {
    if (this.check()) {
      this.displayModal = false;

      this.save.emit(this.thuocSelected);
    }
  }

  openNewDoiTuong() {
    this.displayNewDialog = true;
  }

  onSaveNewDoiTuong(doituong: DoiTuong) {
    if (!doituong.id) {
      this.doituongService.createDT(doituong).subscribe((resp) => {
        if (resp.status == CommonConstant.STATUS_OK_200) {
          this.toastService.success("Lưu thành công");
          this.getThuoc();
        } else {
          this.toastService.error("Lưu thất bại");
        }
      });
    } else {
      this.doituongService.updateDT(doituong).subscribe((resp) => {
        if (resp.status == CommonConstant.STATUS_OK_200) {
          this.toastService.success("Cập nhật thành công");
          this.getThuoc();
        } else {
          this.toastService.error("Cập nhật thất bại");
        }
      });
    }

    this.displayNewDialog = false;
  }

  onCancelNewDoiTuong(event: any) {
    this.displayNewDialog = false;
  }

  deleteDoituong(doituong: DoiTuong) {
    this.doituongService.deleteDT(doituong.id).subscribe((resp) => {
      if (resp.status == CommonConstant.STATUS_OK_200) {
        this.toastService.success("Xóa thành công");
        this.getThuoc();
      } else {
        this.toastService.error("Xóa thất bại");
      }
    });
  }

  handleDialogClose(result: boolean) {
    if (result) {
      this.deleteDoituong(this.scoreCardDelete);
    } else {
      this.scoreCardDelete = {};
    }
  }
  preDeleteScoreCard(doituong: DoiTuong) {
    this.displayConfirmDialog = true;
    this.messageService.add({
      severity: "error",
      summary: "Rejected",
      detail: "You have rejected",
    });
    this.confirmationService.confirm({
      message: this.translate.instant("test.confirm.delete.scoreCard"),
      header: this.translate.instant("common.confirm.delete"),
      icon: "pi pi-info-circle",
      accept: () => {
        this.deleteDoituong(doituong);
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

  update(doituong: DoiTuong) {
    this.displayNewDialog = true;
    this.doituongNew = doituong;
  }

  selectDoituong(model: DoiTuong) {
    const index = this.thuocSelected.findIndex(
      (item: any) => item.id === model.id
    );
    if (index === -1) {
      // Thêm đối tượng vào danh sách nếu chưa tồn tại
      this.thuocSelected.push(model);
    } else {
      // Loại bỏ đối tượng nếu đã tồn tại
      this.thuocSelected.splice(index, 1);
    }

    console.log("selected", this.thuocSelected);
  }

  isSelected(modelId: string): boolean {
    return this.thuocSelected.some((item) => item.id === modelId);
  }
}
