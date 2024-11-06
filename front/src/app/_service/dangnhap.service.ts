// role.service.ts
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Role } from "src/app/_model/auth/role";
import { Product } from "../_model/product";
import { Observable } from "rxjs";
import { DataResponse } from "../_model/resp/data-response";
import { HeadersUtil } from "../_util/headers-util";
import { environment } from "src/environments/environment";
import { DangNhapModel } from "../_model/dangnhap";

@Injectable({
  providedIn: "root",
})
export class DangNhapService {
  constructor(private http: HttpClient) {}

  //   getProducts(): Observable<DataResponse> {
  //     const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
  //     const url = environment.backApiUrl + "/user/getUserInfo";
  //     return this.http.get<DataResponse>(url, { headers: headers });
  //   }

  dangNhap(userInfo: DangNhapModel): Observable<any> {
    const apiUrl = environment.backApiUrl + `/dangnhap`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    let params = new HttpParams()
    .set("tenDangNhap", userInfo.tenDangNhap?.toString() || "")
    .set("matKhau",  userInfo.matKhau?.toString() || "")


    return this.http.post(`${apiUrl}`, userInfo, {
      headers: headers,
      params: params,
    });
  }
}
