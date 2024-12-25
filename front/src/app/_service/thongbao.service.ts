// role.service.ts
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HeadersUtil } from "../_util/headers-util";
import { environment } from "src/environments/environment";
import { CommonConstant } from "../_constant/common.constants";
import { BehaviorSubject, Observable, map } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class ThongBaoService {
  constructor(private http: HttpClient) {}

  private tbSubject = new BehaviorSubject<any>({});

  getTBSubject() {
    return this.tbSubject.asObservable();
  }

  getLstAdmin(request: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/thongbao/search`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.post(`${apiUrl}`, request, {
      headers: headers,
    });
  }

  getLst(request: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/thongbao/list`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http
      .post(`${apiUrl}`, request, {
        headers: headers,
      })
      .pipe(
        map((res: any) => {
          if (res.status == CommonConstant.STATUS_OK_200) {
            this.tbSubject.next(res.data);
          }
          return res; // Trả về kết quả từ server
        })
      );
  }

  create(request: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/thongbao/create`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.post(`${apiUrl}`, request, {
      headers: headers,
    });
  }

  get(id: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/thongbao/get`;
    let params = new HttpParams().set("id", id?.toString() || "");

    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.get(`${apiUrl}`, {
      headers: headers,
      params: params,
    });
  }

  delete(id: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/thongbao/delete`;
    let params = new HttpParams().set("id", id?.toString() || "");

    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.delete(`${apiUrl}`, {
      headers: headers,
      params: params,
    });
  }

  update(request: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/thongbao/update`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.put(`${apiUrl}`, request, {
      headers: headers,
    });
  }
}
