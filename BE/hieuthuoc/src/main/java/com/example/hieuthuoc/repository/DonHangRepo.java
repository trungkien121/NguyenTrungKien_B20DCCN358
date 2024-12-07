package com.example.hieuthuoc.repository;

import com.example.hieuthuoc.entity.DonHang;
import com.example.hieuthuoc.entity.DonHang.TrangThaiGiaoHang;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonHangRepo extends JpaRepository<DonHang, Integer> {
	
	Page<DonHang> findByTrangThaiGiaoHang(TrangThaiGiaoHang trangThaiGiaoHang, Pageable pageable);

	Page<DonHang> findAll(Pageable pageable);
}
