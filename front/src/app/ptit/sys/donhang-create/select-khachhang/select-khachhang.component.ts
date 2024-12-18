import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from "primeng/api";
import { CommonConstant } from "src/app/_constant/common.constants";
import { NguoiDung } from "src/app/_model/auth/nguoidung";
import { SearchModel } from "src/app/_model/common/Search";
import { DoiTuong } from "src/app/_model/doituong";
import { Thuoc } from "src/app/_model/thuoc";
import { NguoidungService } from "src/app/_service/auth/nguoidung.service";
import { DoituongService } from "src/app/_service/doituong.service";
import { ThuocService } from "src/app/_service/thuoc.service";

@Component({
  selector: "app-select-khachhang",
  templateUrl: "./select-khachhang.component.html",
  providers: [ConfirmationService, MessageService],
})
export class SelectKhachHangComponent implements OnInit {
  constructor(
    private doituongService: DoituongService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private toastService: ToastrService,
    private translate: TranslateService,
    private thuocService: ThuocService,
    private nguoidungService: NguoidungService
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

  modelSearch: SearchModel = {};
  @Input()
  customerSelected: NguoiDung | undefined;

  customerLst: NguoiDung[] = [];

  ngOnInit() {
    this.getKH();
  }

  search() {
    this.getKH();
  }

  getKH() {
    this.nguoidungService.getUserLst(this.modelSearch).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        this.customerLst = res.data.data;
      }
    });
  }

  onCancel() {
    this.cancel.emit(false);
  }

  check() {
    let check = true;
    if (!this.customerSelected) {
      check = false;
    }
    return check;
  }

  onSave() {
    if (this.check()) {
      this.displayModal = false;

      this.save.emit(this.customerSelected);
    }
  }

  update(doituong: DoiTuong) {
    this.displayNewDialog = true;
    this.doituongNew = doituong;
  }

  selectKH(model: NguoiDung) {
    this.customerSelected = model;
  }

  isSelected(modelId: string): boolean {
    return this.customerSelected?.id === modelId;
  }
}
