import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { CalendarModule } from "primeng/calendar";
import { AppFileUploadModule } from "src/app/components/common/appFileUpload/appFileUpload.module";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { TableModule } from "primeng/table";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { MessagesModule } from "primeng/messages";
import { SharedPipeModule } from "src/app/_pipe/sharedpipe.module";
import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from "./user.component";
import { TreeTableModule } from "primeng/treetable";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RadioButtonModule } from "primeng/radiobutton";
import { DataViewModule } from "primeng/dataview";
import { PaginatorModule } from "primeng/paginator";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import { ProfileComponent } from "./profile/profile.component";
import { GiohangComponent } from "./giohang/giohang.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { DonMuaComponent } from "./donmua/donmua.component";
import { ThongBaoComponent } from "./thongbao/thongbao.component";
import { DonMuaChiTietComponent } from "./donmua-chitiet/donmua-chitiet.component";
import { ThuocTuLoaiThuocComponent } from "../public/thuoctuloaithuoc/thuoctuloaithuoc.component";

@NgModule({
  declarations: [
    UserComponent,
    ProfileComponent,
    GiohangComponent,
    CheckoutComponent,
    DonMuaComponent,
    ThongBaoComponent,
    DonMuaChiTietComponent,
    ThuocTuLoaiThuocComponent,
  ],

  imports: [
    CommonModule,
    UserRoutingModule,
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
    RadioButtonModule,
    DataViewModule,
    PaginatorModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
