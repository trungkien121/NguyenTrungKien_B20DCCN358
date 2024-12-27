import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ConfirmationService, MessageService } from "primeng/api";
import { CommonConstant } from "src/app/_constant/common.constants";
import { OptionSelect } from "src/app/_model/common/Option";
import { SearchModel } from "src/app/_model/common/Search";
import { DanhMucThuoc } from "src/app/_model/danhmucthuoc";
import { DoiTuong } from "src/app/_model/doituong";
import { LoaiThuoc } from "src/app/_model/loaithuoc";
import { NhaSanXuat } from "src/app/_model/nsx";
import { ThanhPhanThuoc } from "src/app/_model/thanhphanthuoc";
import { Thuoc } from "src/app/_model/thuoc";
import { DanhmucThuocService } from "src/app/_service/danhmucthuoc.service";
import { LoaithuocService } from "src/app/_service/loaithuoc.service";
import { NSXService } from "src/app/_service/nsx.service";
import { ThuocService } from "src/app/_service/thuoc.service";

@Component({
  selector: "app-thuoc-createment",
  templateUrl: "./thuoc-createment.component.html",
  styleUrls:["./thuoc-createment.component.css"],
  providers: [ConfirmationService, MessageService],
})
export class ThuocCreatementComponent implements OnInit {
  thuoc: Thuoc = {};
  loaithuocLst: LoaiThuoc[] = [];
  nsxLst: NhaSanXuat[] = [];
  danhmucLst: DanhMucThuoc[] = [];

  doituongSelected: DoiTuong[] = [];
  thanhPhanThuocLSt: ThanhPhanThuoc[] = [];

  modelSearch: SearchModel = {
    keyWord: "",
    id: 0,
    currentPage: 0,
    size: 100,
    sortedField: "",
  };

  statusOptions: any = {
    name: "",
    value: true,
  };
  categoryOption: OptionSelect[] = [];
  displayDialog: boolean = false;

  constructor(
    private thuocService: ThuocService,
    private loaithuocService: LoaithuocService,
    private nsxService: NSXService,
    private dmThuocService: DanhmucThuocService,
    private toastService: ToastrService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  deleteDoiTuongSelected(doituong: DoiTuong) {
    const index = this.doituongSelected.findIndex(
      (item: any) => item.id === doituong.id
    );

    this.doituongSelected.splice(index, 1);
  }

  handleCancel(displayDialog: boolean) {
    this.displayDialog = displayDialog;
    // this.courseNew = {};
  }

  handleSaveDoiTuong(doituongSelected: DoiTuong[]) {
    console.log("selected", doituongSelected);
    this.doituongSelected = doituongSelected;
    // this.applyScoreCard(scoreCard, this.typeTestActiveTab);
  }

  getThuocByParam() {
    this.route.queryParams.subscribe(async (params) => {
      this.thuoc.id = this.route.snapshot.paramMap.get("id") || "";
      if (this.thuoc.id) {
        this.getThuocById(this.thuoc.id);
      }
    });
  }

  getThuocById(id: string) {
    this.thuocService.getProduct(id).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        this.thuoc = res.data;
        this.thuoc.loaiThuocId = this.thuoc.loaiThuoc?.id;
        this.thuoc.danhMucThuocId = this.thuoc.danhMucThuoc?.id;
        this.thuoc.nhaSanXuatId = this.thuoc.nhaSanXuat?.id;
        this.doituongSelected = this.thuoc.doiTuongs as DoiTuong[];
        this.thanhPhanThuocLSt = this.thuoc.thanhPhanThuocs as ThanhPhanThuoc[];
        if (this.thuoc.avatar) {
          this.imageUrl = this.thuoc.avatar;
        }

        if (this.thuoc.hanSuDung) {
          const date = new Date(this.thuoc.hanSuDung);

          this.thuoc.hanSuDung = `${date.getFullYear()}-${(
            "0" +
            (date.getMonth() + 1)
          ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
        }
      }
    });
  }

  ngOnInit() {
    this.addThanhPhanThuoc();
    this.getThuocByParam();
    this.getLoaiThuoc();
    this.getNSX();
    // this.getDanhMucThuoc();

    this.statusOptions = [
      {
        name: "Đang bán",
        value: true,
      },
      {
        name: "Ngừng bán",
        value: false,
      },
    ];
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

  // getDanhMucThuoc() {
  //   this.dmThuocService.getDMTLst().subscribe((res) => {
  //     if (res.status == CommonConstant.STATUS_OK_200) {
  //       this.danhmucLst = res.data;
  //     }
  //   });
  // }

  getThuoc(id: string) {
    this.thuocService.getProduct(id).subscribe((res) => {
      if (res.status == CommonConstant.STATUS_OK_200) {
        this.thuoc = res.data;
      }
    });
  }

  search() {}

  onStatusChange(value: any) {
    this.thuoc.trangThai = value;
  }

  onLoaiThuocChange(value: string) {
    this.thuoc.loaiThuocId = value;
  }

  onNSXChange(value: string) {
    this.thuoc.nhaSanXuatId = value;
    // console.log("nsxId", value);
  }

  onDanhmucThuocChange(value: string) {
    this.thuoc.danhMucThuocId = value;
  }

  addThanhPhanThuoc() {
    const thanhPhanThuocNew = {
      id: "",
      tenThanhPhan: "",
      hamLuong: "",
      donVi: "",
    };
    this.thanhPhanThuocLSt.push(thanhPhanThuocNew);
  }

  deleteThanhPhanThuoc(index: number) {
    this.thanhPhanThuocLSt.splice(index, 1);
  }

  imageUrl: string | ArrayBuffer | null = null; // Biến để lưu đường dẫn hình ảnh đã chọn
  // files: { name: string; size: number; thumbnail: string; error?: string }[] =
  //   []; // Danh sách các tệp hình ảnh

  // Hàm xử lý khi hình ảnh được chọn
  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageUrl = e.target.result; // Cập nhật đường dẫn hình ảnh
      };

      reader.readAsDataURL(file); // Đọc tệp hình ảnh

      // Lưu tệp vào thuộc tính thuoc.file
      this.thuoc.file = file;
    }
  }

  check(thuoc: Thuoc) {
    let check = true;

    // Kiểm tra tên thuốc
    if (thuoc.tenThuoc == undefined || thuoc.tenThuoc.trim().length == 0) {
      check = false;
      this.thuoc.tenThuoc = ""; // Đặt lại giá trị của tên thuốc
      return check;
    }

    // Kiểm tra giaNhap (giá nhập)
    if (
      thuoc.giaNhap == undefined ||
      isNaN(thuoc.giaNhap) ||
      thuoc.giaNhap <= 0
    ) {
      check = false;
      this.thuoc.giaNhap = 0; // Đặt lại giá trị của giá nhập về 0
      return check;
    }

    // Kiểm tra giaBan (giá bán)
    if (thuoc.giaBan == undefined || isNaN(thuoc.giaBan) || thuoc.giaBan <= 0) {
      check = false;
      this.thuoc.giaBan = 0; // Đặt lại giá trị của giá bán về 0
      return check;
    }

    if (
      thuoc.soLuongTon == undefined ||
      isNaN(thuoc.soLuongTon) ||
      thuoc.soLuongTon < 0 ||
      !Number.isInteger(thuoc.soLuongTon)
    ) {
      check = false;
      this.thuoc.soLuongTon = 0; // Đặt lại giá trị của số lượng tồn về 0
      return check;
    }

    // Kiểm tra mã thuốc
    if (thuoc.maThuoc == undefined || thuoc.maThuoc.trim().length == 0) {
      check = false;
      this.thuoc.maThuoc = "";
      return check;
    }

    // Ví dụ, kiểm tra mã vạch (nếu cần)
    // if (thuoc.maVach == undefined || thuoc.maVach.trim().length == 0) {
    //   check = false;
    //   this.thuoc.maVach = ""; // Đặt lại giá trị của mã vạch
    //   return check;
    // }

    return check;
  }

  handeSave() {
    if (this.check(this.thuoc)) {
      console.log("thuoc", this.thuoc);

      this.thuoc.doiTuongs = this.doituongSelected;
      this.thuoc.thanhPhanThuocs = this.thanhPhanThuocLSt;

      if (!this.thuoc.id) {
        this.thuocService.createProduct(this.thuoc).subscribe((resp) => {
          if (resp.status == CommonConstant.STATUS_OK_200) {
            this.toastService.success("Lưu thành công");
            this.router.navigate(["/sys/product"]);
          } else if (resp.status == CommonConstant.STATUS_OK_409) {
            this.toastService.error(resp.msg);
          } else {
            this.toastService.error("Lưu thất bại");
          }
        });
      } else {
        this.thuocService.updateProduct(this.thuoc).subscribe((resp) => {
          if (resp.status == CommonConstant.STATUS_OK_200) {
            this.toastService.success("Cập nhật thành công");
            this.router.navigate(["/sys/product"]);
          } else if (resp.status == CommonConstant.STATUS_OK_409) {
            this.toastService.error(resp.msg);
          } else {
            this.toastService.error("Cập nhật thất bại");
          }
        });
      }
    }
  }
}
