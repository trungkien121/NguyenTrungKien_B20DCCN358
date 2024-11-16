package com.example.hieuthuoc.security;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import com.example.hieuthuoc.jwt.JwtFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
	@Autowired
	private JwtFilter jwtFilter;

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	// Khi đăng nhâp thì sẽ vào hàm này đâu tiên để kiểm tra
	@Bean
	public DaoAuthenticationProvider authenticationProvider(UserDetailsService userSecurityService) {
		DaoAuthenticationProvider dap = new DaoAuthenticationProvider();
		dap.setUserDetailsService(userSecurityService);
		dap.setPasswordEncoder(passwordEncoder());
		return dap;
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

		http.authorizeHttpRequests(config -> {
			
			config.requestMatchers("/**").permitAll();
			
//			for (ApiEndpoint endpoint : ApiRegistry.apiEndpoints) {
//				if ("PUBLIC".equals(endpoint.getType())) {
//					config.requestMatchers(endpoint.getApi()).permitAll();
//				} else if ("PRIVATE".equals(endpoint.getType())) {
//					config.requestMatchers(endpoint.getApi()).hasAuthority(endpoint.getName());
//				}
//			}
//			config.anyRequest().authenticated(); // Các request khác yêu cầu xác thực
		});


		// Cấu hình cors
		http.cors(cors -> {
			cors.configurationSource(request -> {
				CorsConfiguration corsConfig = new CorsConfiguration();
				corsConfig.addAllowedOrigin("*");
				corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
				corsConfig.addAllowedHeader("*");
				return corsConfig;
			});
		});

		http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
		http.sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		http.httpBasic(Customizer.withDefaults());
		http.csrf(AbstractHttpConfigurer::disable);

		return http.build();
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}
}
