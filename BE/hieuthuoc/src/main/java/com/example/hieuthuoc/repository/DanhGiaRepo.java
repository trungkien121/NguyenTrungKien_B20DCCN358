package com.example.hieuthuoc.repository;

import com.example.hieuthuoc.entity.DanhGia;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DanhGiaRepo extends JpaRepository<DanhGia, Integer> {
	
	Page<DanhGia> findByThuocId(int id, Pageable pageable);
}
