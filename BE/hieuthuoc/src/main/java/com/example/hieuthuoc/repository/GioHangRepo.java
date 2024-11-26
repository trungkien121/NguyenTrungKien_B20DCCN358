package com.example.hieuthuoc.repository;

import com.example.hieuthuoc.entity.GioHang;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GioHangRepo extends JpaRepository<GioHang, Integer> {
	Optional<GioHang> findByKhachHangId(Integer nguoiDungId);
}
