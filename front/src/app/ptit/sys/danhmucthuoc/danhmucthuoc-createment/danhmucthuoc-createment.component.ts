import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { DanhMucThuoc } from "src/app/_model/danhmucthuoc";
import { LoaiThuoc } from "src/app/_model/loaithuoc";

declare var $: any;

@Component({
  selector: "app-danhmucthuoc-createment",
  templateUrl: "./danhmucthuoc-createment.component.html",
})
export class DanhmucThuocCreatementComponent implements OnInit {
  constructor(public translate: TranslateService) {}

  @Input()
  dmThuoc: DanhMucThuoc = {};

  @Output()
  save: EventEmitter<any> = new EventEmitter();

  @Output()
  cancel: EventEmitter<any> = new EventEmitter();

  displayModal: boolean = true;

  ngOnInit() {}

  onCancel() {
    this.cancel.emit(false);
  }

  check(dmThuoc: DanhMucThuoc) {
    let check = true;
    // if (loaithuoc.moTa == undefined || loaithuoc.moTa.trim().length == 0) {
    //   check = false;
    //   this.loaithuoc.moTa = "";
    // }
    if (
      dmThuoc.tenDanhMuc == undefined ||
      dmThuoc.tenDanhMuc.trim().length == 0
    ) {
      check = false;
      this.dmThuoc.tenDanhMuc = "";
    }
    return check;
  }

  onSave() {
    if (this.check(this.dmThuoc)) {
      this.displayModal = false;
      this.save.emit(this.dmThuoc);
    }
  }
}
