import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PagesRoutingModule } from "./pages-routing.module";
import { PagesComponent } from "./pages.component";
import { LayoutsModule } from "../components/layouts/layouts.module";
import { SharedModule } from "../components/shared/shared.module";
import { TreeTableModule } from "primeng/treetable";
import { ToastModule } from "primeng/toast";

@NgModule({
  declarations: [PagesComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    LayoutsModule,
    SharedModule,
    TreeTableModule,
    ToastModule,
  ],
})
export class PagesModule {}
