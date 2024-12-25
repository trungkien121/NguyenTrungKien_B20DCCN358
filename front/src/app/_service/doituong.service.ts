// role.service.ts
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HeadersUtil } from "../_util/headers-util";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DoituongService {
  constructor(private http: HttpClient) {}

  getDTLst(request?: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/doituong/list`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.get(`${apiUrl}`, {
      headers: headers,
    });
  }

  getDTLst2(request?: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/doituong/search_by_ten_doi_tuong`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();
    let params = new HttpParams().set("tenDoiTuong", request?.toString() || "");

    return this.http.get(`${apiUrl}`, {
      params: params,
      headers: headers,
    });
  }


  createDT(request: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/doituong/create`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.post(`${apiUrl}`, request, {
      headers: headers,
    });
  }

  deleteDT(id: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/doituong/delete`;
    let params = new HttpParams().set("id", id?.toString() || "");

    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.delete(`${apiUrl}`, {
      headers: headers,
      params: params,
    });
  }

  updateDT(request: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/doituong/update`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.put(`${apiUrl}`, request, {
      headers: headers,
    });
  }
}
