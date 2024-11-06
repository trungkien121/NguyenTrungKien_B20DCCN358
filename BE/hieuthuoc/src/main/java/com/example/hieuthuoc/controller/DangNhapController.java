package com.example.hieuthuoc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.jwt.JwtService;
import com.example.hieuthuoc.security.LoginRequest;

@RestController
public class DangNhapController {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	JwtService jwtService;

	@PostMapping("/dangnhap")
	public ResponseDTO<String> login(@RequestBody LoginRequest loginRequest) {
		// authen
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getTenDangNhap(), loginRequest.getMatKhau()));

		return ResponseDTO.<String>builder().status(200).data(jwtService.generateToken(loginRequest.getTenDangNhap())).build();
	}

}
