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
    const apiUrl = environment.backApiUrl + `/thuoc/list`;
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
      hinhAnh: undefined, // Không cần gửi thuộc tính `hinhAnh` nếu không dùng
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

    return this.http.post(`${apiUrl}`, formData, {
      headers: headers,
    });
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

  updateProduct(request: any): Observable<any> {
    const apiUrl = environment.backApiUrl + `/thuoc/update`;
    const headers: HttpHeaders = HeadersUtil.getHeaders();

    return this.http.put(`${apiUrl}`, request, {
      headers: headers,
    });
  }
}
