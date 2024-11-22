import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HeadersUtil } from "../_util/headers-util";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class NguoidungService {
  constructor(private http: HttpClient) {}

  create(userInfo: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/nguoidung/create`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    let params = new HttpParams();

    return this.http.post(`${apiUrl}`, userInfo, {
      headers: headers,
      params: params,
    });
  }
}
