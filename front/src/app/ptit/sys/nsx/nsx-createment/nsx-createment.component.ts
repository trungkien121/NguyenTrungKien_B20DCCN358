import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { PrimeNGConfig } from "primeng/api";
import { LoaiThuoc } from "src/app/_model/loaithuoc";
import { NhaCungCap } from "src/app/_model/ncc";
import { NhaSanXuat } from "src/app/_model/nsx";

declare var $: any;

@Component({
  selector: "app-nsx-createment",
  templateUrl: "./nsx-createment.component.html",
})
export class NsxCreatementComponent implements OnInit {
  constructor(public translate: TranslateService) {}

  @Input()
  nsx: NhaSanXuat = {};

  @Output()
  save: EventEmitter<any> = new EventEmitter();

  @Output()
  cancel: EventEmitter<any> = new EventEmitter();

  displayModal: boolean = true;

  ngOnInit() {}

  onCancel() {
    this.cancel.emit(false);
  }

  check(nsx: NhaSanXuat) {
    let check = true;
    if (nsx.diaChi == undefined || nsx.diaChi.trim().length == 0) {
      check = false;
      this.nsx.diaChi = "";
      return check;
    }
    if (
      nsx.tenNhaSanXuat == undefined ||
      nsx.tenNhaSanXuat.trim().length == 0
    ) {
      check = false;
      this.nsx.tenNhaSanXuat = "";
      return check;
    }
    // if (nsx.soDienThoai == undefined || nsx.soDienThoai.trim().length == 0) {
    //   check = false;
    //   this.nsx.soDienThoai = "";
    //   return check;
    // }
    if (nsx.email == undefined || nsx.email.trim().length == 0) {
      check = false;
      this.nsx.email = "";
      return check;
    }
    if (nsx.maNSX == undefined || nsx.maNSX.trim().length == 0) {
      check = false;
      this.nsx.maNSX = "";
      return check;
    }
    return check;
  }

  onSave() {
    if (this.check(this.nsx)) {
      this.displayModal = false;
      this.save.emit(this.nsx);
    }
  }
}
