import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SysRoutingModule } from "./sys-routing.module";
import { SysComponent } from "./sys.component";
import { TreeTableModule } from "primeng/treetable";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { CalendarModule } from "primeng/calendar";
import { AppFileUploadModule } from "src/app/components/common/appFileUpload/appFileUpload.module";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { SelectCommonComponent } from "src/app/components/common/selectCommon/selectCommon.component";
import { InputTextareaModule } from "primeng/inputtextarea";
import { TableModule } from "primeng/table";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { MessagesModule } from "primeng/messages";
import { ConfirmDialogCommonComponent } from "src/app/components/common/confirmDialogCommon/confirmDialogCommon.component";
import { SharedPipeModule } from "src/app/_pipe/sharedpipe.module";
import { AngMusicPlayerModule } from "ang-music-player";
import { CommonSpinnerComponent } from "src/app/components/common/spinnerCommon/common-spinner.component";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { ThuocComponent } from "./product/thuoc.component";
import { ThuocCreatementComponent } from "./product/thuoc-createment/thuoc-createment.component";
import { NCCComponent } from "./ncc/ncc.component";
import { CustomerComponent } from "./customer/customer.component";
import { DonHangComponent } from "./donhang/donhang.component";
import { LoaiThuocComponent } from "./loaithuoc/loaithuoc.component";
import { NccCreatementComponent } from "./ncc/ncc-createment/ncc-createment.component";
import { NSXComponent } from "./nsx/nsx.component";
import { NsxCreatementComponent } from "./nsx/nsx-createment/nsx-createment.component";
import { DanhmucThuocCreatementComponent } from "./danhmucthuoc/danhmucthuoc-createment/danhmucthuoc-createment.component";
import { DanhmucThuocComponent } from "./danhmucthuoc/danhmucthuoc.component";
import { LoaiThuocCreatementComponent } from "./loaithuoc/loaithuoc-createment/loaithuoc-createment.component";
import { DoiTuongCreatementComponent } from "./doituong/doituong-createment/doituong-createment.component";
import { DoituongComponent } from "./doituong/doituong.component";
import { ChucNangComponent } from "./chucnang/chucnang.component";
import { ChucNangCreatementComponent } from "./chucnang/chucnang-createment/chucnang-createment.component";
import { SelectDoiTUongComponent } from "./product/select-doituong/select-doituong.component";
import { PhieuNhapComponent } from "./phieunhap/phieunhap.component";
import { PhieuNhapCreatementComponent } from "./phieunhap/phieunhap-createment/phieunhap-createment.component";
import { SelectThuocComponent } from "./phieunhap/select-thuoc/select-thuoc.component";
import { ChiTietDonHangComponent } from "./donhang/chitiet-donhang/chitiet-donhang.component";
import { ThongKecComponent } from "./thongke/thongke.component";
import { DonHangCreateComponent } from "./donhang-create/donhang-create.component";
import { SelectKhachHangComponent } from "./donhang-create/select-khachhang/select-khachhang.component";
import { HighchartsChartModule } from "highcharts-angular";
import { ThongBaoComponent } from "./thongbao/thongbao.component";
import { ThongBaoCreatementComponent } from "./thongbao/thongbao-createment/thongbao-createment.component";
import { TonKhoComponent } from "./tonkho/tonkho.component";

@NgModule({
  declarations: [
    SysComponent,
    SelectCommonComponent,
    CommonSpinnerComponent,
    ConfirmDialogCommonComponent,
    ThuocComponent,
    ThuocCreatementComponent,
    CustomerComponent,
    DonHangComponent,
    LoaiThuocComponent,
    LoaiThuocCreatementComponent,
    NccCreatementComponent,
    NCCComponent,
    NSXComponent,
    NsxCreatementComponent,
    DanhmucThuocCreatementComponent,
    DanhmucThuocComponent,
    DoiTuongCreatementComponent,
    DoituongComponent,
    ChucNangComponent,
    ChucNangCreatementComponent,
    SelectDoiTUongComponent,
    PhieuNhapComponent,
    PhieuNhapCreatementComponent,
    SelectThuocComponent,
    ChiTietDonHangComponent,
    ThongKecComponent,
    DonHangCreateComponent,
    SelectKhachHangComponent,
    ThongBaoComponent,
    ThongBaoCreatementComponent,
    TonKhoComponent,
  ],
  imports: [
    CommonModule,
    SysRoutingModule,
    TreeTableModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    CalendarModule,
    AppFileUploadModule,
    DropdownModule,
    InputTextareaModule,
    InputTextModule,
    TableModule,
    ConfirmDialogModule,
    MessagesModule,
    SharedPipeModule.forRoot(),
    AngMusicPlayerModule,
    ProgressSpinnerModule,
    TableModule,
    HighchartsChartModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SysModule {}
