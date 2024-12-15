// role.service.ts
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HeadersUtil } from "../_util/headers-util";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class GioHangService {
  constructor(private http: HttpClient) {}

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
