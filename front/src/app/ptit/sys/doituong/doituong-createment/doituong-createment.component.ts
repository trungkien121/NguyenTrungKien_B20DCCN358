import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { DanhMucThuoc } from "src/app/_model/danhmucthuoc";
import { DoiTuong } from "src/app/_model/doituong";
import { LoaiThuoc } from "src/app/_model/loaithuoc";

declare var $: any;

@Component({
  selector: "app-doituong-createment",
  templateUrl: "./doituong-createment.component.html",
})
export class DoiTuongCreatementComponent implements OnInit {
  constructor(public translate: TranslateService) {}

  @Input()
  doituong: DoiTuong = {};

  @Output()
  save: EventEmitter<any> = new EventEmitter();

  @Output()
  cancel: EventEmitter<any> = new EventEmitter();

  @Input()
  displayModal: boolean = true;

  ngOnInit() {}

  onCancel() {
    this.cancel.emit(false);
  }

  check(doituong: DoiTuong) {
    let check = true;

    if (
      doituong.tenDoiTuong == undefined ||
      doituong.tenDoiTuong.trim().length == 0
    ) {
      check = false;
      doituong.tenDoiTuong = "";
    }
    return check;
  }

  onSave() {
    if (this.check(this.doituong)) {
      this.displayModal = false;
      this.save.emit(this.doituong);
    }
  }
}
