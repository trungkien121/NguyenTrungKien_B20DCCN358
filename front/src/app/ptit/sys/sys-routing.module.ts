import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SysComponent } from "./sys.component";
import { RoleGuard } from "src/app/_guard/role.guard";
import { AuthConstant } from "src/app/_constant/auth.constant";
import { ThuocComponent } from "./product/thuoc.component";
import { ThuocCreatementComponent } from "./product/thuoc-createment/thuoc-createment.component";
import { NCCComponent } from "./ncc/ncc.component";
import { CustomerComponent } from "./customer/customer.component";
import { DonHangComponent } from "./donhang/donhang.component";
import { LoaiThuocComponent } from "./loaithuoc/loaithuoc.component";
import { NSXComponent } from "./nsx/nsx.component";
import { DanhmucThuocComponent } from "./danhmucthuoc/danhmucthuoc.component";
import { DoituongComponent } from "./doituong/doituong.component";

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
    component: ThuocComponent,
  },
  {
    path: "customer",
    component: CustomerComponent,
  },
  {
    path: "product-create",
    component: ThuocCreatementComponent,
  },
  {
    path: "product-create/:id",
    component: ThuocCreatementComponent,
  },
  {
    path: "ncc",
    component: NCCComponent,
  },
  {
    path: "nsx",
    component: NSXComponent,
  },
  {
    path: "donhang",
    component: DonHangComponent,
  },
  {
    path: "loaithuoc",
    component: LoaiThuocComponent,
  },
  {
    path: "danhmucThuoc",
    component: DanhmucThuocComponent,
  },
  {
    path: "doituong",
    component: DoituongComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SysRoutingModule {}
