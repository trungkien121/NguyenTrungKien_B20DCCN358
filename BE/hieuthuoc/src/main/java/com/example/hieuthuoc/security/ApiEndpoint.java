package com.example.hieuthuoc.security;

import lombok.Data;

@Data
public class ApiEndpoint {
	private String api;
	private String name;
	private String type;
	
    public ApiEndpoint(String api, String name, String type) {
        this.api = api;
        this.name = name;
        this.type = type;
    }
}
