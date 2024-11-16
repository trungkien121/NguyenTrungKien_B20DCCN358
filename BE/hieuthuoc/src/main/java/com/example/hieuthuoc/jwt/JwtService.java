package com.example.hieuthuoc.jwt;

import java.security.Key;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.example.hieuthuoc.dto.ChucNangDTO;
import com.example.hieuthuoc.dto.NguoiDungDTO;
import com.example.hieuthuoc.dto.NhomQuyenDTO;
import com.example.hieuthuoc.service.NguoiDungService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtService {
	private static final String KEY_SECRET = "nk3zaTywZTKnmnRWZeZuuJdMRWNlewVsLpoPEtFK26QHq7LKgEtCElJ4SwY3L+76\r\n"
			+ "";

	@Autowired
	private NguoiDungService nguoiDungService;

	// Tạo jwt dựa trên username (tạo thông tin cần trả về cho FE khi đăng nhập
	// thành công)
	public String generateToken(String tenDangNhap) {
		Map<String, Object> claims = new HashMap<>();
		NguoiDungDTO nguoiDung = nguoiDungService.getByTenDangNhap(tenDangNhap);
		claims.put("id", nguoiDung.getId());
		claims.put("lastName", nguoiDung.getHoTen());

		List<Map<String, Object>> nhomQuyen_chucNang = new ArrayList<>();

		for (NhomQuyenDTO nhomQuyen : nguoiDung.getNhomQuyens()) {

			Map<String, Object> roleMap = new HashMap<>();

			roleMap.put("nhomQuyen", nhomQuyen.getTenNhomQuyen());

			List<String> chucNangs = new ArrayList<>();
			for (ChucNangDTO chucNang : nhomQuyen.getChucNangs()) {
				chucNangs.add(chucNang.getTenChucNang());
			}
			roleMap.put("chucNangs", chucNangs);

			nhomQuyen_chucNang.add(roleMap);
		}

		claims.put("nhomQuyens", nhomQuyen_chucNang);

		return createToken(claims, tenDangNhap);
	}

	// Toạ jwt với các claims đã chọn
	private String createToken(Map<String, Object> claims, String tenDangNhap) {
		return Jwts.builder().setClaims(claims).setSubject(tenDangNhap)
				.setIssuedAt(new Date(System.currentTimeMillis()))
//                .setExpiration(new Date(System.currentTimeMillis() + 30 * 60 * 1000) ) // Hết hạn sau 30 phút
				.setExpiration(new Date(System.currentTimeMillis() + 100000L * 60 * 60 * 1000))
				.signWith(getSigneKey(), SignatureAlgorithm.HS256).compact();
	}

	// Lấy key_secret
	private Key getSigneKey() {
		byte[] keyByte = Decoders.BASE64.decode(KEY_SECRET);
		return Keys.hmacShaKeyFor(keyByte);
	}

	// Trích xuất thông tin (lấy ra tất cả thông số)
	private Claims extractAllClaims(String token) {
		return Jwts.parserBuilder().setSigningKey(getSigneKey()).build().parseClaimsJws(token).getBody();
	}

	// Trích xuất thông tin cụ thể nhưng triển khai tổng quát (Method Generic)
	public <T> T extractClaims(String token, Function<Claims, T> claimsTFunction) {
		final Claims claims = extractAllClaims(token);
		return claimsTFunction.apply(claims);
	}

	// Lấy ra thời gian hết hạn
	public Date extractExpiration(String token) {
		return extractClaims(token, Claims::getExpiration);
	}

	// Lấy ra username
	public String extractUsername(String token) {
		return extractClaims(token, Claims::getSubject);
	}

	// Kiểm tra token đó hết hạn chưa
	private Boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date());
	}

	// Kiểm tra tính hợp lệ của token
	public Boolean validateToken(String token, UserDetails userDetails) {
		final String username = extractUsername(token);
		return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}
}
