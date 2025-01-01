import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { PrimeNGConfig } from "primeng/api";
import { CommonConstant } from "src/app/_constant/common.constants";
import { DanhMucThuoc } from "src/app/_model/danhmucthuoc";
import { LoaiThuoc } from "src/app/_model/loaithuoc";
import { ThongBao } from "src/app/_model/thongbao";
import { DanhmucThuocService } from "src/app/_service/danhmucthuoc.service";
import { ThongBaoService } from "src/app/_service/thongbao.service";

declare var $: any;

@Component({
  selector: "app-thongbao-createment",
  templateUrl: "./thongbao-createment.component.html",
})
export class ThongBaoCreatementComponent implements OnInit {
  constructor(
    public translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private dmThuocService: DanhmucThuocService,
    private thongBaoService: ThongBaoService
  ) {}

  dmThuocLst: DanhMucThuoc[] = [];

  @Input()
  thongbao: ThongBao = {};

  @Output()
  save: EventEmitter<any> = new EventEmitter();

  @Output()
  cancel: EventEmitter<any> = new EventEmitter();

  displayModal: boolean = true;
  loaiThongBaoList = [
    { value: "CA_NHAN", label: "Cá Nhân" },
    { value: "CANH_BAO", label: "Cảnh Báo" },
    { value: "GIAO_DICH", label: "Giao Dịch" },
    { value: "HE_THONG", label: "Hệ Thống" },
    { value: "KHUYEN_MAI", label: "Khuyến Mãi" },
    { value: "SU_KIEN", label: "Sự Kiện" },
    { value: "TAI_KHOAN", label: "Tài Khoản" },
  ];

  selectedLoaiThongBao: string = ""; // Lựa chọn hiện tại

  onThongBaoChange(newOption: string): void {
    this.selectedLoaiThongBao = newOption;
    console.log("Loại thông báo được chọn:", this.selectedLoaiThongBao);
  }

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

  onCancel() {
    this.cancel.emit(false);
  }

  check(loaithuoc: LoaiThuoc) {
    let check = true;
    if (
      this.thongbao.loaiThongBao == undefined ||
      this.thongbao.loaiThongBao.trim().length == 0
    ) {
      check = false;
      this.thongbao.loaiThongBao = "";
    }
    return check;
  }

  onSave() {
    if (this.check(this.thongbao)) {
      this.displayModal = false;
      this.save.emit(this.thongbao);
    }
  }
}
