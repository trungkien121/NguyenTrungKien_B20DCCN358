// role.service.ts
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HeadersUtil } from "../_util/headers-util";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class VnPayService {
  constructor(private http: HttpClient) {}

  create(amount: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/payment/create`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();
    let params = new HttpParams().set("amount", amount.toString() || "");

    return this.http.post(
      `${apiUrl}`,
      {},
      {
        headers: headers,
        params: params,
      }
    );
  }
}
