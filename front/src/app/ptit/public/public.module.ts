import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PublicRoutingModule } from "./public-routing.module";
import { PublicComponent } from "./public.component";
import { TranslateModule } from "@ngx-translate/core";
import { TreeTableModule } from "primeng/treetable";
import { HomeComponent } from "./home/home.component";
import { FormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./sign-up/signup.component";
import { ThuocChiTietComponent } from "./thuoc-chitiet/thuoc-chitiet.component";

@NgModule({
  declarations: [
    PublicComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ThuocChiTietComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    TranslateModule,
    TreeTableModule,
    FormsModule,
  ],
})
export class DashboardsModule {}
