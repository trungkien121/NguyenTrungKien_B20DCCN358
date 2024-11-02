// role.service.ts
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Role } from "src/app/_model/auth/role";
import { Product } from "../_model/product";
import { Observable } from "rxjs";
import { DataResponse } from "../_model/resp/data-response";
import { HeadersUtil } from "../_util/headers-util";
import { environment } from "src/environments/environment";

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
