// role.service.ts
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HeadersUtil } from "../_util/headers-util";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DanhmucThuocService {
  constructor(private http: HttpClient) {}

  getDMTLst(request?: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/danhmucthuoc/list`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.get(`${apiUrl}`, {
      headers: headers,
    });
  }

  
  getDMTLst2(request?: string): Observable<any> {
    const apiUrl = environment.backApiUrl + `/danhmucthuoc/search_by_ten_danh_muc`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();
    let params = new HttpParams().set("tenDanhMuc", request?.toString() || "");

    return this.http.get(`${apiUrl}`, {
      params: params,
      headers: headers,
    });
  }

  getDanhMucAndLoaiThuoc(): Observable<any>{
    const apiUrl = environment.backApiUrl + `/danhmucthuoc/get_danh_muc_and_loai_thuoc`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.get(`${apiUrl}`, {
      headers: headers,
    });
  }

  createDMT(request: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/danhmucthuoc/create`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.post(`${apiUrl}`, request, {
      headers: headers,
    });
  }

  deleteDMT(id: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/danhmucthuoc/delete`;
    let params = new HttpParams().set("id", id?.toString() || "");

    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.delete(`${apiUrl}`, {
      headers: headers,
      params: params,
    });
  }

  updateDMT(request: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/danhmucthuoc/update`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.put(`${apiUrl}`, request, {
      headers: headers,
    });
  }
}
