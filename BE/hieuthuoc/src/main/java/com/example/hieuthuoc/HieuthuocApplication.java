package com.example.hieuthuoc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class HieuthuocApplication {

	public static void main(String[] args) {
		SpringApplication.run(HieuthuocApplication.class, args);
	}

}
