// role.service.ts
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DataResponse } from "../_model/resp/data-response";
import { HeadersUtil } from "../_util/headers-util";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProductLst(request: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/thuoc/list`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.post(`${apiUrl}`, request, {
      headers: headers,
    });
  }

  createProduct(request: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/thuoc/create`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.post(`${apiUrl}`, request, {
      headers: headers,
    });
  }
}
