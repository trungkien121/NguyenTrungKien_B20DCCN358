// role.service.ts
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HeadersUtil } from "../_util/headers-util";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DonhangService {
  constructor(private http: HttpClient) {}

  getLst(request: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/donhang/list`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.post(`${apiUrl}`, request, {
      headers: headers,
    });
  }

  create(request: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/donhang/create`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.post(`${apiUrl}`, request, {
      headers: headers,
    });
  }

  get(id: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/donhang/get`;
    let params = new HttpParams().set("id", id?.toString() || "");

    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.get(`${apiUrl}`, {
      headers: headers,
      params: params,
    });
  }

  delete(id: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/donhang/delete`;
    let params = new HttpParams().set("id", id?.toString() || "");

    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.delete(`${apiUrl}`, {
      headers: headers,
      params: params,
    });
  }

  update(request: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/donhang/update`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.put(`${apiUrl}`, request, {
      headers: headers,
    });
  }

  changTrangThaiGiaoHang(request: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/donhang/changTrangThaiGiaoHang`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.post(`${apiUrl}`, request, {
      headers: headers,
    });
  }
}
