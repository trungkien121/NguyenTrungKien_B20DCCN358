import { NgModule } from "@angular/core";
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
import { ProductComponent } from "./product/product.component";
import { ProductCreatementComponent } from "./product/product-createment/product-createment.component";
import { NCCComponent } from "./ncc/ncc.component";
import { CustomerComponent } from "./customer/customer.component";
import { DonHangComponent } from "./donhang/donhang.component";
import { LoaiThuocComponent } from "./loaithuoc/loaithuoc.component";
import { LoaiThuocCreatementComponent } from "./loaithuoc/loaithuoc-createment/loaithuoc-createment.component";
import { NccCreatementComponent } from "./ncc/ncc-createment/ncc-createment.component";
import { NSXComponent } from "./nsx/nsx.component";
import { NsxCreatementComponent } from "./nsx/nsx-createment/nsx-createment.component";

@NgModule({
  declarations: [
    SysComponent,
    SelectCommonComponent,
    CommonSpinnerComponent,
    ConfirmDialogCommonComponent,
    ProductComponent,
    ProductCreatementComponent,
    CustomerComponent,
    DonHangComponent,
    LoaiThuocComponent,
    LoaiThuocCreatementComponent,
    NccCreatementComponent,
    NCCComponent,
    NSXComponent,
    NsxCreatementComponent,
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
  ],
})
export class SysModule {}
