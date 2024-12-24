package com.example.hieuthuoc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.hieuthuoc.entity.DoiTuong;

@Repository
public interface DoiTuongRepo extends JpaRepository<DoiTuong, Integer> {
	Boolean existsByTenDoiTuong(String tenDoiTuong);
	
	DoiTuong findByTenDoiTuong(String tenDoiTuong);
	
	@Query("SELECT n FROM DoiTuong n WHERE LOWER(n.tenDoiTuong) LIKE LOWER(CONCAT('%', :tenDoiTuong, '%'))")
	List<DoiTuong> searchByTenDoiTuong(@Param("tenDoiTuong") String tenDoiTuong);
}
