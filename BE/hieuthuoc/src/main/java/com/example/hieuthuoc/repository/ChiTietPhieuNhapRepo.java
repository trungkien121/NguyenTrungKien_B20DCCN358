package com.example.hieuthuoc.repository;

import com.example.hieuthuoc.entity.ChiTietPhieuNhap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChiTietPhieuNhapRepo extends JpaRepository<ChiTietPhieuNhap, Integer> {}
