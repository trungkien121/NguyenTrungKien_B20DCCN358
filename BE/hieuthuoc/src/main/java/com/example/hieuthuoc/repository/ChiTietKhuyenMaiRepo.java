package com.example.hieuthuoc.repository;

import com.example.hieuthuoc.entity.ChiTietKhuyenMai;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChiTietKhuyenMaiRepo extends JpaRepository<ChiTietKhuyenMai, Integer> {}
