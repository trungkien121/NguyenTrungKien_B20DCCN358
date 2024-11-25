package com.example.hieuthuoc.repository;

import com.example.hieuthuoc.entity.DanhMucThuoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DanhMucThuocRepo extends JpaRepository<DanhMucThuoc, Integer> {
	 boolean existsByTenDanhMuc(String tenDanhMuc);
}
