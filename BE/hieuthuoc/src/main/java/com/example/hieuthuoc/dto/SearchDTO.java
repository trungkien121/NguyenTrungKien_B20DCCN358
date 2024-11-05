package com.example.hieuthuoc.dto;

import lombok.Data;

@Data
public class SearchDTO {
	private String keyWord;
	
	private Integer currentPage;
	private Integer size;
	private String sortedField;
}
