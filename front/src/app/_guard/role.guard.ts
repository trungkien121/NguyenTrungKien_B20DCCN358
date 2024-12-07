import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { lastValueFrom } from "rxjs";
import { CommonConstant } from "../_constant/common.constants";
import { Quyen } from "../_model/auth/quyen";
import { Cookie } from "ng2-cookies";
import { AuthConstant } from "../_constant/auth.constant";
import { NguoidungService } from "../_service/auth/nguoidung.service";
import { jwtDecode } from "jwt-decode";
import { NguoiDung } from "../_model/auth/nguoidung";

@Injectable({
  providedIn: "root",
})
export class RoleGuard implements CanActivate {
  constructor(public router: Router, private authService: NguoidungService) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let isPermission: boolean = false;
    const roles = route.data["guards"];
    // console.log("roles", roles);
    let isAuthenticate: boolean = false;
    if (Cookie.check(AuthConstant.ACCESS_TOKEN_KEY)) {
      isAuthenticate = true;
    }
    if (isAuthenticate) {
      const _token = Cookie.get(AuthConstant.ACCESS_TOKEN_KEY);

      const userInfo = jwtDecode(_token) as NguoiDung;

      if (userInfo.id) {
        await lastValueFrom(this.authService.get(userInfo.id))
          .then((resp: any) => {
            if (CommonConstant.STATUS_OK_200 == resp.status) {
              let temp: any = resp.data.nhomQuyens;
              let roleStr: string[] = [...temp].map((role: Quyen) => role.id);
              // console.log("role", roleStr);
              isPermission = roleStr.some((role: string) =>
                roles.includes(role)
              );
            }
          })
          .catch((err: any) => {});
      }
    }

    if (!isPermission) {
      this.router.navigate(["/error/403"]);
    }
    return isPermission;
  }
}
