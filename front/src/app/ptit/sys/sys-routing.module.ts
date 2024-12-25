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
import { ChucNangComponent } from "./chucnang/chucnang.component";
import { PhieuNhapComponent } from "./phieunhap/phieunhap.component";
import { PhieuNhapCreatementComponent } from "./phieunhap/phieunhap-createment/phieunhap-createment.component";
import { ChiTietDonHangComponent } from "./donhang/chitiet-donhang/chitiet-donhang.component";
import { ThongKecComponent } from "./thongke/thongke.component";
import { DonHangCreateComponent } from "./donhang-create/donhang-create.component";
import { ThongBaoComponent } from "./thongbao/thongbao.component";

const routes: Routes = [
  // { path: "", redirectTo: "menu-manage", pathMatch: "full" },
  // { path: "menu-manage", component: MenuManageComponent },
  {
    path: "",
    component: SysComponent,
    children: [
      { path: "", redirectTo: "thongke", pathMatch: "full" },
      {
        path: "product",
        component: ThuocComponent,
        canActivate: [RoleGuard],
        data: {
          guards: [AuthConstant.ROLE_ADMIN],
        },
      },
      {
        path: "customer",
        component: CustomerComponent,
        canActivate: [RoleGuard],
        data: {
          guards: [AuthConstant.ROLE_ADMIN],
        },
      },
      {
        path: "product-create",
        component: ThuocCreatementComponent,
        canActivate: [RoleGuard],
        data: {
          guards: [AuthConstant.ROLE_ADMIN],
        },
      },
      {
        path: "product-create/:id",
        component: ThuocCreatementComponent,
        canActivate: [RoleGuard],
        data: {
          guards: [AuthConstant.ROLE_ADMIN],
        },
      },
      {
        path: "ncc",
        component: NCCComponent,
        canActivate: [RoleGuard],
        data: {
          guards: [AuthConstant.ROLE_ADMIN],
        },
      },
      {
        path: "nsx",
        component: NSXComponent,
        canActivate: [RoleGuard],
        data: {
          guards: [AuthConstant.ROLE_ADMIN],
        },
      },
      {
        path: "donhang",
        component: DonHangComponent,
        canActivate: [RoleGuard],
        data: {
          guards: [AuthConstant.ROLE_ADMIN],
        },
      },
      {
        path: "donhang-create",
        component: DonHangCreateComponent,
        canActivate: [RoleGuard],
        data: {
          guards: [AuthConstant.ROLE_ADMIN],
        },
      },
      {
        path: "loaithuoc",
        component: LoaiThuocComponent,
        canActivate: [RoleGuard],
        data: {
          guards: [AuthConstant.ROLE_ADMIN],
        },
      },
      {
        path: "danhmucThuoc",
        component: DanhmucThuocComponent,
        canActivate: [RoleGuard],
        data: {
          guards: [AuthConstant.ROLE_ADMIN],
        },
      },
      {
        path: "doituong",
        component: DoituongComponent,
        canActivate: [RoleGuard],
        data: {
          guards: [AuthConstant.ROLE_ADMIN],
        },
      },
      {
        path: "chucnang",
        component: ChucNangComponent,
        canActivate: [RoleGuard],
        data: {
          guards: [AuthConstant.ROLE_ADMIN],
        },
      },
      {
        path: "phieunhap",
        component: PhieuNhapComponent,
        canActivate: [RoleGuard],
        data: {
          guards: [AuthConstant.ROLE_ADMIN],
        },
      },
      {
        path: "phieunhap-create",
        component: PhieuNhapCreatementComponent,
        canActivate: [RoleGuard],
        data: {
          guards: [AuthConstant.ROLE_ADMIN],
        },
      },
      {
        path: "phieunhap-create/:id",
        component: PhieuNhapCreatementComponent,
        canActivate: [RoleGuard],
        data: {
          guards: [AuthConstant.ROLE_ADMIN],
        },
      },
      {
        path: "chitiet-donhang/:id",
        component: ChiTietDonHangComponent,
        canActivate: [RoleGuard],
        data: {
          guards: [AuthConstant.ROLE_ADMIN],
        },
      },
      {
        path: "thongke",
        component: ThongKecComponent,
        canActivate: [RoleGuard],
        data: {
          guards: [AuthConstant.ROLE_ADMIN],
        },
      },
      {
        path: "thongbao",
        component: ThongBaoComponent,
        canActivate: [RoleGuard],
        data: {
          guards: [AuthConstant.ROLE_ADMIN],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SysRoutingModule {}
