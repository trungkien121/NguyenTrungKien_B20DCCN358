package com.example.hieuthuoc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.hieuthuoc.entity.LoaiThuoc;

@Repository
public interface LoaiThuocRepo extends JpaRepository<LoaiThuoc, Integer> {
	
	Boolean existsByTenLoai(String tenLoai);
	
	@Query("SELECT l FROM LoaiThuoc l WHERE LOWER(l.tenLoai) LIKE LOWER(CONCAT('%', :tenLoai, '%'))")
	List<LoaiThuoc> searchByTenLoai(@Param("tenLoai") String tenLoai);

}
