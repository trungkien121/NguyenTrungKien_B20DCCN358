import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { PrimeNGConfig } from "primeng/api";
import { LoaiThuoc } from "src/app/_model/loaithuoc";
import { NhaCungCap } from "src/app/_model/ncc";

declare var $: any;

@Component({
  selector: "app-ncc-createment",
  templateUrl: "./ncc-createment.component.html",
})
export class NccCreatementComponent implements OnInit {
  constructor(public translate: TranslateService) {}

  @Input()
  ncc: NhaCungCap = {};

  @Output()
  save: EventEmitter<any> = new EventEmitter();

  @Output()
  cancel: EventEmitter<any> = new EventEmitter();

  displayModal: boolean = true;

  ngOnInit() {}

  onCancel() {
    this.cancel.emit(false);
  }

  check(ncc: NhaCungCap) {
    let check = true;
    if (ncc.diaChi == undefined || ncc.diaChi.trim().length == 0) {
      check = false;
      this.ncc.diaChi = "";
      return check;
    }
    if (
      ncc.tenNhaCungCap == undefined ||
      ncc.tenNhaCungCap.trim().length == 0
    ) {
      check = false;
      this.ncc.tenNhaCungCap = "";
      return check;
    }
    // if (ncc.soDienThoai == undefined || ncc.soDienThoai.trim().length == 0) {
    //   check = false;
    //   this.ncc.soDienThoai = "";
    //   return check;
    // }
    if (ncc.email == undefined || ncc.email.trim().length == 0) {
      check = false;
      this.ncc.email = "";
      return check;
    }
    if (ncc.maNCC == undefined || ncc.maNCC.trim().length == 0) {
      check = false;
      this.ncc.maNCC = "";
      return check;
    }
    return check;
  }

  onSave() {
    if (this.check(this.ncc)) {
      this.displayModal = false;
      this.save.emit(this.ncc);
    }
  }
}
