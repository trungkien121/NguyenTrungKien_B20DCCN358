import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { PrimeNGConfig } from "primeng/api";
import { CommonConstant } from "src/app/_constant/common.constants";
import { DanhMucThuoc } from "src/app/_model/danhmucthuoc";
import { LoaiThuoc } from "src/app/_model/loaithuoc";
import { DanhmucThuocService } from "src/app/_service/danhmucthuoc.service";

declare var $: any;

@Component({
  selector: "app-loaithuoc-createment",
  templateUrl: "./loaithuoc-createment.component.html",
})
export class LoaiThuocCreatementComponent implements OnInit {
  constructor(
    public translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private dmThuocService: DanhmucThuocService
  ) {}

  dmThuocLst: DanhMucThuoc[] = [];

  @Input()
  loaithuoc: LoaiThuoc = {};

  @Output()
  save: EventEmitter<any> = new EventEmitter();

  @Output()
  cancel: EventEmitter<any> = new EventEmitter();

  displayModal: boolean = true;

  getDmThuocLst() {
    this.dmThuocService.getDMTLst().subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        this.dmThuocLst = res.data;
        this.cdr.detectChanges();
      }
    });
  }
  ngOnInit() {
    this.getDmThuocLst();
  }

  onDMChange(value: string){
    // console.log("hehe", value)
    this.loaithuoc.danhMucThuocId = value
  }

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
