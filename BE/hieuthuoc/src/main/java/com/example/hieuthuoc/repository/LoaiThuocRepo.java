package com.example.hieuthuoc.repository;

import com.example.hieuthuoc.entity.LoaiThuoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoaiThuocRepo extends JpaRepository<LoaiThuoc, Integer> {
	
	Boolean existsByTenLoai(String tenLoai);
}
