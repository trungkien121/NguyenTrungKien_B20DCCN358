package com.example.hieuthuoc.repository;

import com.example.hieuthuoc.entity.DanhGia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DanhGiaRepo extends JpaRepository<DanhGia, Integer> {}
