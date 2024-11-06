import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./ptit/public/login/login.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "",
    loadChildren: () =>
      import("./ptit/pages.module").then((m) => m.PagesModule),
  },
  {
    path: "error",
    loadChildren: () =>
      import("./components/errors/errors.module").then((m) => m.ErrorsModule),
  },
  { path: "**", redirectTo: "error" },
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, { useHash: true })],
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
