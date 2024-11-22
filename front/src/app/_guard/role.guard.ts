import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { lastValueFrom } from "rxjs";
import { AuthenticationService } from "../_service/auth/authentication.service";
import { CommonConstant } from "../_constant/common.constants";
import { Quyen } from "../_model/auth/quyen";
import { DataResponse } from "../_model/resp/data-response";
import { Cookie } from "ng2-cookies";
import { AuthConstant } from "../_constant/auth.constant";

@Injectable({
  providedIn: "root",
})
export class RoleGuard implements CanActivate {
  constructor(
    public router: Router,
    private authService: AuthenticationService
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let isPermission: boolean = false;
    const roles = route.data["guards"];
    let isAuthenticate: boolean = false;
    if (Cookie.check(AuthConstant.ACCESS_TOKEN_KEY)) {
      isAuthenticate = true;
    }
    if (isAuthenticate) {
      await lastValueFrom(this.authService.getRoles())
        .then((resp: DataResponse) => {
          if (CommonConstant.RESULT_OK == resp.status) {
            let temp: any = resp.responseData;
            let roleStr: string[] = [...temp].map((role: Quyen) => role.id);
            isPermission = roleStr.some((role: string) => roles.includes(role));
          }
        })
        .catch((err: any) => {});
    }

    if (!isPermission) {
      this.router.navigate(["/error/403"]);
    }
    return isPermission;
  }
}
