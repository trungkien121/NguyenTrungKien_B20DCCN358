import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserComponent } from "./user.component";
import { RoleGuard } from "src/app/_guard/role.guard";
import { AuthConstant } from "src/app/_constant/auth.constant";
import { HomeComponent } from "../public/home/home.component";
import { ProfileComponent } from "./profile/profile.component";

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
        // data: { guards: [AuthConstant.ROLE_NORMAL, AuthConstant.ROLE_ADMIN] },
      },

      {
        path: "profile",
        component: ProfileComponent,
        // canActivate: [RoleGuard],
        // data: { guards: [AuthConstant.ROLE_NORMAL, AuthConstant.ROLE_ADMIN] },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
