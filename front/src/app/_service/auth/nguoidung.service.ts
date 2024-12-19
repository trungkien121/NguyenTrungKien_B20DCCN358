import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Cookie } from "ng2-cookies";
import { Observable } from "rxjs";
import { AuthConstant } from "src/app/_constant/auth.constant";
import { HeadersUtil } from "src/app/_util/headers-util";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class NguoidungService {
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
    this.router.navigate(["/login"]);

    // window.location.href =
    //   environment.backApiUrl +
    //     "/auth/login?actionType=logout&redirectUri=" +
    //     doamin || "";
  }

  checkAuthen(): boolean {
    if (!Cookie.check(AuthConstant.ACCESS_TOKEN_KEY)) {
      this.logIn();
      return false;
    }
    return true;
  }

  // getRoles(): Observable<any> {
  //   const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
  //   const url = environment.backApiUrl + "/nguoidung/getRoles";
  //   return this.http.get<any>(url, { headers: headers });
  // }

  get(id: any): Observable<any> {
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
    let params = new HttpParams().set("id", id?.toString() || "");

    const url = environment.backApiUrl + "/nguoidung/get";
    return this.http.get<any>(url, {
      headers: headers,
      params: params,
    });
  }

  update(user: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/nguoidung/update`;
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();

    let params = new HttpParams();

    return this.http.put(`${apiUrl}`, user, {
      headers: headers,
      params: params,
    });
  }

  changePwd(user: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/nguoidung/change_matkhau`;
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();

    let params = new HttpParams();

    return this.http.put(`${apiUrl}`, user, {
      headers: headers,
      params: params,
    });
  }

  dangky(userInfo: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/nguoidung/dangky`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    let params = new HttpParams();

    return this.http.post(`${apiUrl}`, userInfo, {
      headers: headers,
      params: params,
    });
  }

  getUserLst(request: any): Observable<any> {
    const headers: HttpHeaders = HeadersUtil.getHeaders();
    let params = new HttpParams();
    const url = environment.backApiUrl + "/nguoidung/list";
    return this.http.post<any>(url, request, {
      headers: headers,
      params: params,
    });
  }

  delete(id: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/nguoidung/delete`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    let params = new HttpParams().set("id", id?.toString() || "");

    return this.http.delete(`${apiUrl}`, {
      headers: headers,
      params: params,
    });
  }

  changeAvatar(model: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/nguoidung/change_avatar`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    const formData = new FormData(); // Thêm dữ liệu JSON của `thuocDTO` vào FormData

    const nguoiDungDTO = {
      ...model, // Các trường trong `thuoc`
      file: undefined, // Xóa thuộc tính `file` nếu đã gửi dưới dạng MultipartFile
    };
    formData.append(
      "nguoiDungDTO",
      new Blob([JSON.stringify(nguoiDungDTO)], { type: "application/json" })
    );

    // Thêm tệp (File) vào FormData
    if (model.file) {
      formData.append("file", model.file);
    }

    return this.http.put(`${apiUrl}`, formData, {});
  }
}
