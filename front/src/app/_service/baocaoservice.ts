// role.service.ts
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HeadersUtil } from "../_util/headers-util";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BaoCaoService {
  constructor(private http: HttpClient) {}

  getDoanhThuTheoThang(request?: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/baocao/doanhthutheothang`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    let params = new HttpParams()
      .set("nam", request.nam?.toString() || "")
      .set("thang", request.thang?.toString() || "");

    return this.http.get(`${apiUrl}`, {
      headers: headers,
      params: params,
    });
  }

  getDoanhThuTheoNgay(request?: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/baocao/doanhthutheongay`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    let params = new HttpParams().set("ngay", request || "");

    return this.http.get(`${apiUrl}`, {
      headers: headers,
      params: params,
    });
  }

  getDoanhThuTheoNam(request?: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/baocao/doanhthutheonam`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    let params = new HttpParams().set("nam", request.toString() || "");

    return this.http.get(`${apiUrl}`, {
      headers: headers,
      params: params,
    });
  }
}
