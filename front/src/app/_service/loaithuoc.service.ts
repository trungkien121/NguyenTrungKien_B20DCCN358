// role.service.ts
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HeadersUtil } from "../_util/headers-util";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoaithuocService {
  constructor(private http: HttpClient) {}

  getLoaiThuocLst(id: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/loaithuoc/list`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();
    // let params = new HttpParams().set("id", id?.toString() || "");

    return this.http.get(`${apiUrl}`, {
      headers: headers,
      // params: params,
    });
  }

  getLoaiThuocLst2(model: string): Observable<any> {
    const apiUrl = environment.backApiUrl + `/loaithuoc/search_by_ten_loai`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();
    let params = new HttpParams().set("tenLoai", model?.toString() || "");

    return this.http.get(`${apiUrl}`, {
      headers: headers,
      params: params,
    });
  }

  createLoaiThuoc(request: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/loaithuoc/create`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.post(`${apiUrl}`, request, {
      headers: headers,
    });
  }

  //   getLoaiThuoc(id: any): Observable<any> {
  //     const apiUrl = environment.backApiUrl + `/thuoc/get`;
  //     let params = new HttpParams().set("id", id?.toString() || "");

  //     const headers: HttpHeaders = HeadersUtil.getHeaders();

  //     return this.http.get(`${apiUrl}`, {
  //       headers: headers,
  //       params: params,
  //     });
  //   }

  deleteLoaiThuoc(id: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/loaithuoc/delete`;
    let params = new HttpParams().set("id", id?.toString() || "");

    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.delete(`${apiUrl}`, {
      headers: headers,
      params: params,
    });
  }

  updateLoaiThuoc(request: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/loaithuoc/update`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.put(`${apiUrl}`, request, {
      headers: headers,
    });
  }
}
