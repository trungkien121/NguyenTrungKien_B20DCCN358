package com.example.hieuthuoc.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.hieuthuoc.entity.Thuoc;

@Repository
public interface ThuocRepo extends JpaRepository<Thuoc, Integer> {

	@Query("SELECT t FROM Thuoc t WHERE t.tenThuoc like :x")
    Page<Thuoc> findByTenThuoc(@Param("x") String tenThuoc, Pageable pageable); // Tìm thuốc theo tên
}
