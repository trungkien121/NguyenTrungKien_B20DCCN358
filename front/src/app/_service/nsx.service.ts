// role.service.ts
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HeadersUtil } from "../_util/headers-util";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NSXService {
  constructor(private http: HttpClient) {}

  getNSXLst(request?: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/nhasanxuat/list`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.get(`${apiUrl}`, {
      headers: headers,
    });
  }

  createNSX(request: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/nhasanxuat/create`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.post(`${apiUrl}`, request, {
      headers: headers,
    });
  }

  deleteNSX(id: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/nhasanxuat/delete`;
    let params = new HttpParams().set("id", id?.toString() || "");

    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.delete(`${apiUrl}`, {
      headers: headers,
      params: params,
    });
  }

  updateNSX(request: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/nhasanxuat/update`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.put(`${apiUrl}`, request, {
      headers: headers,
    });
  }
}
