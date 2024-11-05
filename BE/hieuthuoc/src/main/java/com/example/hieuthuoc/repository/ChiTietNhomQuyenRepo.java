package com.example.hieuthuoc.repository;

import com.example.hieuthuoc.entity.ChiTietNhomQuyen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChiTietNhomQuyenRepo extends JpaRepository<ChiTietNhomQuyen, Integer> {}
