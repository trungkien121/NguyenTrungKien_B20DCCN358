package com.example.hieuthuoc.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.hieuthuoc.entity.PhieuNhap;

@Repository
public interface PhieuNhapRepo extends JpaRepository<PhieuNhap, Integer> {
	
	@Query("SELECT pn FROM PhieuNhap pn WHERE pn.nhaCungCap.tenNhaCungCap LIKE %:tenNhaCungCap%")
	Page<PhieuNhap> findByNhaCungCapTen(@Param("tenNhaCungCap") String tenNhaCungCap, Pageable pageable);

}

