// role.service.ts
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HeadersUtil } from "../_util/headers-util";
import { environment } from "src/environments/environment";
import { BehaviorSubject, Observable, map } from "rxjs";
import { CommonConstant } from "../_constant/common.constants";
import { GioHangChiTiet } from "../_model/giohangchitiet";
import { AuthConstant } from "../_constant/auth.constant";
import { Cookie } from "ng2-cookies";
import { NguoiDung } from "../_model/auth/nguoidung";
import { jwtDecode } from "jwt-decode";
import { GioHang } from "../_model/giohang";

@Injectable({
  providedIn: "root",
})
export class GioHangService {
  constructor(private http: HttpClient) {}

  private gioHangSubject = new BehaviorSubject<GioHang>({});

  getGHSubject(nguoiDungId: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/giohang/get`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    let params = new HttpParams().set(
      "nguoiDungId",
      nguoiDungId?.toString() || ""
    );

    return this.http
      .get(`${apiUrl}`, {
        params: params,
        headers: headers,
      })
      .pipe(
        map((data: any) => {
          if (data.status == CommonConstant.STATUS_OK_200) {
            this.gioHangSubject.next(data.data as GioHang);
          }
          return data; // Trả về kết quả từ server
        })
      );
  }

  getGioHangSubject() {
    return this.gioHangSubject.asObservable();
  }

  getGH(nguoiDungId: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/giohang/get`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    let params = new HttpParams().set(
      "nguoiDungId",
      nguoiDungId?.toString() || ""
    );

    return this.http.get(`${apiUrl}`, {
      params: params,
      headers: headers,
    });
  }

  createGH(request: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/giohang/create`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.post(`${apiUrl}`, request, {
      headers: headers,
    });
  }

  deleteGH(id: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/giohang/delete`;
    let params = new HttpParams().set("id", id?.toString() || "");

    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.delete(`${apiUrl}`, {
      headers: headers,
      params: params,
    });
  }

  updateGH(request: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/giohang/update`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.put(`${apiUrl}`, request, {
      headers: headers,
    });
  }
}
