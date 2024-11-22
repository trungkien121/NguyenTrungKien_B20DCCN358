// role.service.ts
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private http: HttpClient) {}

  //   getProducts(): Observable<DataResponse> {
  //     const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
  //     const url = environment.backApiUrl + "/user/getUserInfo";
  //     return this.http.get<DataResponse>(url, { headers: headers });
  //   }
}
