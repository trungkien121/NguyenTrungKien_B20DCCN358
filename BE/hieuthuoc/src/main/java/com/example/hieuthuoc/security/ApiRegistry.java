package com.example.hieuthuoc.security;

import java.util.ArrayList;
import java.util.List;

public class ApiRegistry {
	public static final List<ApiEndpoint> apiEndpoints = new ArrayList<>();

	// PUBLIC
	static {
		apiEndpoints.add(new ApiEndpoint("/dangnhap", "DANG_NHAP", "PUBLIC"));

		apiEndpoints.add(new ApiEndpoint("/nguoidung/get", "XEM_NGUOI_DUNG", "PUBLIC"));
		apiEndpoints.add(new ApiEndpoint("/nguoidung/create", "TAO_NGUOI_DUNG", "PUBLIC"));
		apiEndpoints.add(new ApiEndpoint("/nguoidung/update", "CAP_NHAT_NGUOI_DUNG", "PUBLIC"));
		apiEndpoints.add(new ApiEndpoint("/thuoc/get", "XEM_THUOC", "PUBLIC"));

	}

	// PRIVATE
	static {
		apiEndpoints.add(new ApiEndpoint("/nguoidung/list", "XEM_DANH_SACH_NGUOI_DUNG", "PRIVATE"));
		apiEndpoints.add(new ApiEndpoint("/thuoc/delete", "XOA_THUOC", "PRIVATE"));
		apiEndpoints.add(new ApiEndpoint("/thuoc/update", "CAP_NHAT_THUOC", "PRIVATE"));
		apiEndpoints.add(new ApiEndpoint("/nhomquyen/getall", "XEM_DANH_SACH_NHOM_QUYEN", "PRIVATE"));
	}
}
