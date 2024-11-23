package com.example.hieuthuoc.service;

import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

public interface EmailService {
	void sendEmail(String to , String subject, String body);
}

@Service
class EmailServiceImpl implements EmailService{
	
	@Autowired
	JavaMailSender javaMailSender;

	@Override
	public void sendEmail(String to, String subject, String body) {
		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, StandardCharsets.UTF_8.name());
		
		try {
			helper.setTo(to);
			helper.setSubject(subject);
			helper.setText(body, true);
			
			javaMailSender.send(message);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}
