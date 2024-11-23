package com.example.hieuthuoc.dto;

import groovy.transform.builder.Builder;
import lombok.Data;

@Data
@Builder
public class PageDTO<T> {
	private int totalPages;
	private long totalElements;
	private int currentPage;
	private	T data;
	
}