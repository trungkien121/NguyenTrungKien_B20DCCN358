import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PublicRoutingModule } from "./public-routing.module";
import { PublicComponent } from "./public.component";
import { TranslateModule } from "@ngx-translate/core";
import { TreeTableModule } from "primeng/treetable";
import { HomeComponent } from "./home/home.component";

@NgModule({
  declarations: [PublicComponent, HomeComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    TranslateModule,
    TreeTableModule,
  ],
})
export class DashboardsModule {}
