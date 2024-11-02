import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Cookie } from "ng2-cookies";
import { Observable } from "rxjs";
import { AuthConstant } from "src/app/_constant/auth.constant";
import { DataResponse } from "src/app/_model/resp/data-response";
import { HeadersUtil } from "src/app/_util/headers-util";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,

    public router: Router
  ) {}

  userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  logIn() {
    this.router.navigate(["/login"]);

    // Cookie.delete(AuthConstant.ACCESS_TOKEN_KEY);
    // let doamin = window.location.origin;
    // window.location.href =
    //   environment.authApiUrl + "/auth/login?redirectUri=" + doamin || "";
  }

  logOut(isCallApi?: boolean) {
    // const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    // const url = environment.backApiUrl + "/user/logout";

    // if (isCallApi) {
    //   this.http.get<DataResponse>(url, { headers: headers }).subscribe({
    //     next: (resp: DataResponse) => {},
    //     error: (err: any) => {},
    //   });
    // }

    Cookie.delete(AuthConstant.ACCESS_TOKEN_KEY);
    let doamin = window.location.origin;
    window.location.href =
      environment.authApiUrl +
        "/auth/login?actionType=logout&redirectUri=" +
        doamin || "";
  }

  checkAuthen(): boolean {
    if (!Cookie.check(AuthConstant.ACCESS_TOKEN_KEY)) {
      this.logIn();
      return false;
    }
    return true;
  }

  getUserInfo(): Observable<DataResponse> {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    const url = environment.backApiUrl + "/user/getUserInfo";
    return this.http.get<DataResponse>(url, { headers: headers });
  }

  getRoles(): Observable<DataResponse> {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    const url = environment.backApiUrl + "/user/getRoles";
    return this.http.get<DataResponse>(url, { headers: headers });
  }

  update(user: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/user/updateUserInfo`;
    const headers: HttpHeaders = HeadersUtil.getHeadersAuthCover();

    let params = new HttpParams();

    return this.http.post(`${apiUrl}`, user, {
      headers: headers,
      params: params,
    });
  }
}
