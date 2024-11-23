package com.example.hieuthuoc.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.hieuthuoc.entity.NguoiDung;

@Repository
public interface NguoiDungRepo extends JpaRepository<NguoiDung, Integer> {
	
	@Query("SELECT nd FROM NguoiDung nd WHERE nd.hoTen like :x")
	Page<NguoiDung> searchByName(@Param("x") String s, Pageable pageable);
	
	NguoiDung findByTenDangNhap(String tenDangNhap);
	
	NguoiDung findByEmail(String email);
}
