package com.example.hieuthuoc.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.hieuthuoc.configuration.VNPayConfig;
import com.example.hieuthuoc.dto.ResponseDTO;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/payment")
public class VNPayController {
	@PostMapping("/create")
	public ResponseDTO<String> createPayment(HttpServletRequest req, @RequestParam("amount") long amountRequest)
			throws UnsupportedEncodingException {
		String orderType = "other";
		long amount =amountRequest * 100;

		String vnp_TxnRef = VNPayConfig.getRandomNumber(8);
		String vnp_IpAddr = VNPayConfig.getIpAddress(req);

		String vnp_TmnCode = VNPayConfig.vnp_TmnCode;

		Map<String, String> vnp_Params = new HashMap<>();
		vnp_Params.put("vnp_Version", VNPayConfig.vnp_Version);
		vnp_Params.put("vnp_Command", VNPayConfig.vnp_Command);
		vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
		vnp_Params.put("vnp_Amount", String.valueOf(amount));
		vnp_Params.put("vnp_CurrCode", "VND");
		vnp_Params.put("vnp_BankCode", "NCB");
		vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
		vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
		vnp_Params.put("vnp_OrderType", orderType);
		vnp_Params.put("vnp_Locale", "vn");
		vnp_Params.put("vnp_ReturnUrl", VNPayConfig.vnp_ReturnUrl);
		vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

		Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
		String vnp_CreateDate = formatter.format(cld.getTime());
		vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

		cld.add(Calendar.MINUTE, 15);
		String vnp_ExpireDate = formatter.format(cld.getTime());
		vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

		List fieldNames = new ArrayList(vnp_Params.keySet());
		Collections.sort(fieldNames);
		StringBuilder hashData = new StringBuilder();
		StringBuilder query = new StringBuilder();
		Iterator itr = fieldNames.iterator();
		while (itr.hasNext()) {
		    String fieldName = (String) itr.next();
		    String fieldValue = (String) vnp_Params.get(fieldName);
		    if ((fieldValue != null) && (fieldValue.length() > 0)) {
		        // Build hash data
		        hashData.append(fieldName);
		        hashData.append('=');
		        hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.UTF_8.toString()));
		        // Build query
		        query.append(URLEncoder.encode(fieldName, StandardCharsets.UTF_8.toString()));
		        query.append('=');
		        query.append(URLEncoder.encode(fieldValue, StandardCharsets.UTF_8.toString()));
		        if (itr.hasNext()) {
		            query.append('&');
		            hashData.append('&');
		        }
		    }
		}
		String queryUrl = query.toString();
		String vnp_SecureHash = VNPayConfig.hmacSHA512(VNPayConfig.secretKey, hashData.toString());
		queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
		String paymentUrl = VNPayConfig.vnp_PayUrl + "?" + queryUrl;

		return ResponseDTO.<String>builder().status(200).msg("Thành công.").data(paymentUrl).build();
	}

}
