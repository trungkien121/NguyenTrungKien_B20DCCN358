import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { SidebarLeftComponent } from "./sidebar-top/sidebar-top-admin.component";
import { RouterModule } from "@angular/router";
// Import ngx-translate và các module liên quan
import { TranslateModule } from "@ngx-translate/core";
import { HttpClientModule } from "@angular/common/http";
import { ThongbaoHeaderComponent } from "./header/thongbao-header/thongbao-header.component";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarLeftComponent,
    ThongbaoHeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule, // Thêm HttpClientModule
    TranslateModule,
    // NgxTranslateModule,
  ],
  providers: [],
  exports: [HeaderComponent, FooterComponent, SidebarLeftComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LayoutsModule {}
