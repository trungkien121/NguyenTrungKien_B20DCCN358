import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { PublicComponent } from "./public.component";
import { ThuocChiTietComponent } from "./thuoc-chitiet/thuoc-chitiet.component";

const routes: Routes = [
  {
    path: "",
    component: PublicComponent,
    children: [
      { path: "", redirectTo: "", pathMatch: "full" },
      { path: "home", component: HomeComponent },
      { path: "thuoc-chitiet/:id", component: ThuocChiTietComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
