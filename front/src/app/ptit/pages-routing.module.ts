import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { AuthGuard } from "../_guard/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    // resolve: { redirect: RedirectResolver },
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      {
        path: "",
        loadChildren: () =>
          import("./public/public.module").then((m) => m.DashboardsModule),
        // canActivate: [AuthGuard],
      },
      {
        path: "sys",
        loadChildren: () => import("./sys/sys.module").then((m) => m.SysModule),
        canActivate: [AuthGuard],
      },
      {
        path: "user",
        loadChildren: () =>
          import("./user/user.module").then((m) => m.UserModule),
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
