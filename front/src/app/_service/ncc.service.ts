// role.service.ts
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HeadersUtil } from "../_util/headers-util";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NCCService {
  constructor(private http: HttpClient) {}

  getNCCLst(request?: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/nhacungcap/list`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.get(`${apiUrl}`, {
      headers: headers,
    });
  }

  getNCCLst2(model?: string): Observable<any> {
    const apiUrl = environment.backApiUrl + `/nhacungcap/search_by_ten_nha_cung_cap`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();
    let params = new HttpParams().set("tenNhaCungCap", model?.toString() || "");

    return this.http.get(`${apiUrl}`, {
      headers: headers,
      params: params,

    });
  }


  createNCC(request: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/nhacungcap/create`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.post(`${apiUrl}`, request, {
      headers: headers,
    });
  }

  deleteNCC(id: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/nhacungcap/delete`;
    let params = new HttpParams().set("id", id?.toString() || "");

    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.delete(`${apiUrl}`, {
      headers: headers,
      params: params,
    });
  }

  updateNCC(request: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/nhacungcap/update`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.put(`${apiUrl}`, request, {
      headers: headers,
    });
  }
}
