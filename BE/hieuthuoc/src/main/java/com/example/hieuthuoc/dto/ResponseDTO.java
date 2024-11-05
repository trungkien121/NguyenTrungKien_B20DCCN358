package com.example.hieuthuoc.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResponseDTO<T> {
	private int status; //200 400 500
	private String msg;
	
	@JsonInclude(Include.NON_NULL)  // ckeck xem khi response về json có dữ liệu không nếu not null thì trả về
	private T data;

	public ResponseDTO(int status, String msg) {
		super();
		this.status = status;
		this.msg = msg;
	}
	
}