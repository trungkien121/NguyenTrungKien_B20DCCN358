package com.example.hieuthuoc.repository;

import com.example.hieuthuoc.entity.PhieuNhap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhieuNhapRepo extends JpaRepository<PhieuNhap, Integer> {}

