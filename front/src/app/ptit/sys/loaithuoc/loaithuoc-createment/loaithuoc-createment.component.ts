import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { PrimeNGConfig } from "primeng/api";
import { LoaiThuoc } from "src/app/_model/loaithuoc";

declare var $: any;

@Component({
  selector: "app-loaithuoc-createment",
  templateUrl: "./loaithuoc-createment.component.html",
})
export class LoaiThuocCreatementComponent implements OnInit {
  constructor(public translate: TranslateService) {}

  @Input()
  loaithuoc: LoaiThuoc = {};

  @Output()
  save: EventEmitter<any> = new EventEmitter();

  @Output()
  cancel: EventEmitter<any> = new EventEmitter();

  displayModal: boolean = true;

  ngOnInit() {}

  onCancel() {
    this.cancel.emit(false);
  }

  check(loaithuoc: LoaiThuoc) {
    let check = true;
    // if (loaithuoc.moTa == undefined || loaithuoc.moTa.trim().length == 0) {
    //   check = false;
    //   this.loaithuoc.moTa = "";
    // }
    if (
      loaithuoc.tenLoai == undefined ||
      loaithuoc.tenLoai.trim().length == 0
    ) {
      check = false;
      this.loaithuoc.tenLoai = "";
    }
    return check;
  }

  onSave() {
    if (this.check(this.loaithuoc)) {
      this.displayModal = false;
      this.save.emit(this.loaithuoc);
    }
  }
}
