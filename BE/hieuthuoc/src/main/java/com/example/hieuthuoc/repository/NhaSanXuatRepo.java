package com.example.hieuthuoc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.hieuthuoc.entity.NhaSanXuat;

@Repository
public interface NhaSanXuatRepo extends JpaRepository<NhaSanXuat, Integer> {
	Boolean existsByMaNSX(String maNSX);
	
	@Query("SELECT n FROM NhaSanXuat n WHERE LOWER(n.tenNhaSanXuat) LIKE LOWER(CONCAT('%', :tenNhaSanXuat, '%'))")
	List<NhaSanXuat> searchByTenNhaSanXuat(@Param("tenNhaSanXuat") String tenNhaSanXuat);
}
