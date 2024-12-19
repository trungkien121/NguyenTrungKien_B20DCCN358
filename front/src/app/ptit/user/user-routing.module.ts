import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserComponent } from "./user.component";
import { RoleGuard } from "src/app/_guard/role.guard";
import { AuthConstant } from "src/app/_constant/auth.constant";
import { HomeComponent } from "../public/home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { GiohangComponent } from "./giohang/giohang.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { DonMuaComponent } from "./donmua/donmua.component";
import { ThongBaoComponent } from "./thongbao/thongbao.component";
import { DonMuaChiTietComponent } from "./donmua-chitiet/donmua-chitiet.component";
import { ThuocTuLoaiThuocComponent } from "../public/thuoctuloaithuoc/thuoctuloaithuoc.component";

const routes: Routes = [
  {
    path: "",
    component: UserComponent,
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      {
        path: "home",
        component: HomeComponent,
        // resolve: { redirect: RedirectResolver },
        // canActivate: [RoleGuard],
        // data: { guards: [AuthConstant.ROLE_KHACHHANG, AuthConstant.ROLE_ADMIN] },
      },

      {
        path: "profile",
        component: ProfileComponent,
        canActivate: [RoleGuard],
        data: {
          guards: [AuthConstant.ROLE_KHACHHANG, AuthConstant.ROLE_ADMIN],
        },
      },

      {
        path: "profile",
        component: ProfileComponent,
        canActivate: [RoleGuard],
        data: {
          guards: [AuthConstant.ROLE_KHACHHANG, AuthConstant.ROLE_ADMIN],
        },
      },

      {
        path: "giohang",
        component: GiohangComponent,
        canActivate: [RoleGuard],
        data: {
          guards: [AuthConstant.ROLE_KHACHHANG, AuthConstant.ROLE_ADMIN],
        },
      },

      {
        path: "checkout",
        component: CheckoutComponent,
        canActivate: [RoleGuard],
        data: {
          guards: [AuthConstant.ROLE_KHACHHANG, AuthConstant.ROLE_ADMIN],
        },
      },
      {
        path: "donmua",
        component: DonMuaComponent,
        canActivate: [RoleGuard],
        data: {
          guards: [AuthConstant.ROLE_KHACHHANG, AuthConstant.ROLE_ADMIN],
        },
      },
      {
        path: "donmua-chitiet/:id",
        component: DonMuaChiTietComponent,
        canActivate: [RoleGuard],
        data: {
          guards: [AuthConstant.ROLE_KHACHHANG, AuthConstant.ROLE_ADMIN],
        },
      },
      {
        path: "thuoctuloaithuoc/:loaiThuoc",
        component: ThuocTuLoaiThuocComponent,
        canActivate: [RoleGuard],
        data: {
          guards: [AuthConstant.ROLE_KHACHHANG, AuthConstant.ROLE_ADMIN],
        },
      },
      {
        path: "thongbao",
        component: ThongBaoComponent,
        canActivate: [RoleGuard],
        data: {
          guards: [AuthConstant.ROLE_KHACHHANG, AuthConstant.ROLE_ADMIN],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
