package com.example.hieuthuoc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.hieuthuoc.entity.NhaCungCap;

@Repository
public interface NhaCungCapRepo extends JpaRepository<NhaCungCap, Integer> {
	Boolean existsByMaNCC(String maNCC);
	
	@Query("SELECT n FROM NhaCungCap n WHERE LOWER(n.tenNhaCungCap) LIKE LOWER(CONCAT('%', :tenNhaCungCap, '%'))")
	List<NhaCungCap> searchByTenNhaCungCap(@Param("tenNhaCungCap") String tenNhaCungCap);
}
