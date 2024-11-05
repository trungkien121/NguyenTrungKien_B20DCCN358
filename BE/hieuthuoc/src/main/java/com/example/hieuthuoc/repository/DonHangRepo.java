package com.example.hieuthuoc.repository;

import com.example.hieuthuoc.entity.DonHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonHangRepo extends JpaRepository<DonHang, Integer> {}
