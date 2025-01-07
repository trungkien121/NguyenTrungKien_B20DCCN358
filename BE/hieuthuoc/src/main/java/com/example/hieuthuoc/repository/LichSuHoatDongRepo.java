package com.example.hieuthuoc.repository;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.hieuthuoc.entity.LichSuHoatDong;

public interface LichSuHoatDongRepo extends JpaRepository<LichSuHoatDong, Integer> {

	@Query("SELECT l FROM LichSuHoatDong l WHERE l.createdAt BETWEEN :ngayBatDau AND :ngayKetThuc")
	Page<LichSuHoatDong> search(@Param("ngayBatDau") Date ngayBatDau,
			@Param("ngayKetThuc") Date ngayKetThuc, Pageable pageable);
}