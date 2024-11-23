// role.service.ts
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DataResponse } from "../_model/resp/data-response";
import { HeadersUtil } from "../_util/headers-util";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DanhgiaService {
  constructor(private http: HttpClient) {}

  getLst(request: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/danhgia/list`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.post(`${apiUrl}`, request, {
      headers: headers,
    });
  }

  create(request: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/danhgia/create`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.post(`${apiUrl}`, request, {
      headers: headers,
    });
  }

  get(id: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/danhgia/get`;
    let params = new HttpParams().set("id", id?.toString() || "");

    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.get(`${apiUrl}`, {
      headers: headers,
      params: params,
    });
  }

  delete(id: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/danhgia/delete`;
    let params = new HttpParams().set("id", id?.toString() || "");

    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.delete(`${apiUrl}`, {
      headers: headers,
      params: params,
    });
  }

  update(request: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/danhgia/update`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.put(`${apiUrl}`, request, {
      headers: headers,
    });
  }
}
