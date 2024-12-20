// role.service.ts
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HeadersUtil } from "../_util/headers-util";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ThuocService {
  constructor(private http: HttpClient) {}

  getProductLst(request: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/thuoc/search`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.post(`${apiUrl}`, request, {
      headers: headers,
    });
  }

  createProduct(thuoc: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/thuoc/create`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    const formData = new FormData(); // Thêm dữ liệu JSON của `thuocDTO` vào FormData

    const thuocDTO = {
      ...thuoc, // Các trường trong `thuoc`
      file: undefined, // Xóa thuộc tính `file` nếu đã gửi dưới dạng MultipartFile
    };
    formData.append(
      "thuocDTO",
      new Blob([JSON.stringify(thuocDTO)], { type: "application/json" })
    );

    // Thêm tệp (File) vào FormData
    if (thuoc.file) {
      formData.append("file", thuoc.file);
    }

    return this.http.post(`${apiUrl}`, formData, {});
  }

  getProduct(id: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/thuoc/get`;
    let params = new HttpParams().set("id", id?.toString() || "");

    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.get(`${apiUrl}`, {
      headers: headers,
      params: params,
    });
  }

  deleteProduct(id: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/thuoc/delete`;
    let params = new HttpParams().set("id", id?.toString() || "");

    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.delete(`${apiUrl}`, {
      headers: headers,
      params: params,
    });
  }

  updateProduct(thuoc: any): Observable<any> {
    // const apiUrl = environment.backApiUrl + `/thuoc/update`;
    // const headers: HttpHeaders = HeadersUtil.getHeaders();

    // return this.http.put(`${apiUrl}`, request, {
    //   headers: headers,
    // });

    const apiUrl = environment.backApiUrl + `/thuoc/update`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    const formData = new FormData(); // Thêm dữ liệu JSON của `thuocDTO` vào FormData

    const thuocDTO = {
      ...thuoc, // Các trường trong `thuoc`
      file: undefined, // Xóa thuộc tính `file` nếu đã gửi dưới dạng MultipartFile
    };
    formData.append(
      "thuocDTO",
      new Blob([JSON.stringify(thuocDTO)], { type: "application/json" })
    );

    // Thêm tệp (File) vào FormData
    if (thuoc.file) {
      formData.append("file", thuoc.file);
    }

    return this.http.put(`${apiUrl}`, formData, {
      // headers: headers,
    });
  }

  getProductBestsale(thuoc: any): Observable<any>{
    const apiUrl = environment.backApiUrl + `/thuoc/get_thuoc_ban_chay`;
    const headers: HttpHeaders = HeadersUtil.getHeadersAuth();
  
    // let params = new HttpParams();
    
    return this.http.post(`${apiUrl}`, thuoc, {
      headers: headers,
      // params: params,
    });
  }
}
