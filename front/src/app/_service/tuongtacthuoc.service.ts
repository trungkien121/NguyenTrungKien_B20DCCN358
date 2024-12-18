// role.service.ts
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HeadersUtil } from "../_util/headers-util";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TuongTacThuocService {
  constructor(private http: HttpClient) {}

  get(request?: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/tuongtacthuoc/get`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    let params = new HttpParams()
      .set("hoatChat1", request.hoatChat1.toString() || "")
      .set("hoatChat2", request.hoatChat2.toString() || "");

    return this.http.get(`${apiUrl}`, {
      headers: headers,
      params: params,
    });
  }
}
