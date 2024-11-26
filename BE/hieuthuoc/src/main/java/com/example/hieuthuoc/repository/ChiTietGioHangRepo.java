package com.example.hieuthuoc.repository;

import com.example.hieuthuoc.entity.ChiTietGioHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChiTietGioHangRepo extends JpaRepository<ChiTietGioHang, Integer> {
	Boolean existsByGioHangIdAndThuocId(int gioHangId, int thuocId);
	
	ChiTietGioHang findByThuocId(int id);
}
