import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from "primeng/api";
import { CommonConstant } from "src/app/_constant/common.constants";
import { OptionSelect } from "src/app/_model/common/Option";
import { SearchModel } from "src/app/_model/common/Search";
import { LoaiThuoc } from "src/app/_model/loaithuoc";
import { NhaSanXuat } from "src/app/_model/nsx";
import { Thuoc } from "src/app/_model/thuoc";
import { LoaithuocService } from "src/app/_service/loaithuoc.service";
import { NSXService } from "src/app/_service/nsx.service";
import { ThuocService } from "src/app/_service/thuoc.service";

@Component({
  selector: "app-thuoc",
  templateUrl: "./thuoc.component.html",
  styleUrls: ["./thuoc.component.css"],
  providers: [ConfirmationService, MessageService],
})
export class ThuocComponent implements OnInit {
  productLst: Thuoc[] = [];
  loaithuocLst: LoaiThuoc[] = [];
  nsxLst: NhaSanXuat[] = [];

  // modelSearch: any = {
  //   keyWord: "",
  //   loaiThuoc: "",
  //   nhaSanXuat: "",
  //   danhMucThuoc: "",
  //   tenDoiTuong: "",
  //   maxGiaBan: 0,
  //   currentPage: 0,
  //   size: 10,
  //   sortedField: "",
  // };

  modelSearch: SearchModel = {
    keyWord: "",
    id: 0,
    currentPage: 0,
    size: 100,
    sortedField: "",
    loaiThuoc: "",
  };

  totalRows: number = 0;

  statusOptions: OptionSelect[] = [];
  visibilityOptions: OptionSelect[] = [];
  categoryOption: OptionSelect[] = [];

  constructor(
    private thuocService: ThuocService,
    private loaithuocService: LoaithuocService,
    private nsxService: NSXService,
    private toastService: ToastrService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getData();
    this.statusOptions = [
      {
        name: "Đang bán",
        value: "1",
      },
      {
        name: "Ngừng bán",
        value: "0",
      },
    ];
  }

  getData() {
    this.getThuoc();

    this.getLoaiThuoc();

    this.getNSX();
  }
  getNSX() {
    this.nsxService.getNSXLst().subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        this.nsxLst = res.data;
      }
    });
  }

  getLoaiThuoc() {
    this.loaithuocService.getLoaiThuocLst(this.modelSearch).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        this.loaithuocLst = res.data;
      }
    });
  }

  getThuoc() {
    this.thuocService.getProductLst(this.modelSearch).subscribe((res) => {
      // if (res.status == CommonConstant.STATUS_OK_200) {
      this.productLst = res.data.data;
      this.totalRows = res.data.totalElements;

      // }
    });
  }

  search() {
    this.getData();
  }

  delete(thuoc: Thuoc) {
    this.thuocService.deleteProduct(thuoc.id).subscribe((resp) => {
      if (resp.status == CommonConstant.STATUS_OK_200) {
        this.toastService.success("Xóa thành công");
        this.getData();
      } else {
        this.toastService.error("Xóa thất bại");
      }
    });
  }

  preDelete(thuoc: Thuoc) {
    this.confirmationService.confirm({
      message: "Bạn có chắc muốn xóa thuốc này?",
      header: "Xác nhận xóa thuốc",
      icon: "pi pi-info-circle",
      accept: () => {
        this.delete(thuoc);
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

  preUpdate(thuoc: Thuoc) {
    this.router.navigate([`/sys/product-create/${thuoc.id}`]);
  }

  onStatusChange(newStatus: string) {
    // this.modelSearch.statusSearch = newStatus;
  }

  onNSXChange(newStatus: string) {
    // this.modelSearch.visibilySearch = newStatus;
  }

  onCategoryChange(newCategory: string) {
    this.modelSearch.loaiThuoc = newCategory;
  }
}
