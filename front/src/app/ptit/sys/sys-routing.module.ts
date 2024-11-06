import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SysComponent } from "./sys.component";
import { RoleGuard } from "src/app/_guard/role.guard";
import { AuthConstant } from "src/app/_constant/auth.constant";
import { ProductComponent } from "./product/product.component";
import { ProductCreatementComponent } from "./product/product-createment/product-createment.component";
import { NCCComponent } from "./ncc/ncc.component";
import { CustomerComponent } from "./customer/customer.component";
import { DonHangComponent } from "./donhang/donhang.component";

const routes: Routes = [
  // { path: "", redirectTo: "menu-manage", pathMatch: "full" },
  // { path: "menu-manage", component: MenuManageComponent },
  {
    path: "",
    component: SysComponent,
    children: [{ path: "", redirectTo: "article", pathMatch: "full" }],
  },
  {
    path: "product",
    component: ProductComponent,
  },
  {
    path: "customer",
    component: CustomerComponent,
  },
  {
    path: "product-create",
    component: ProductCreatementComponent,
  },
  {
    path: "ncc",
    component: NCCComponent,
  },
  {
    path: "donhang",
    component: DonHangComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SysRoutingModule {}
