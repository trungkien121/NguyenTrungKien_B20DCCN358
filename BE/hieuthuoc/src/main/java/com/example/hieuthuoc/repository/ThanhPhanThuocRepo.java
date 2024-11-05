package com.example.hieuthuoc.repository;

import com.example.hieuthuoc.entity.ThanhPhanThuoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThanhPhanThuocRepo extends JpaRepository<ThanhPhanThuoc, Integer> {}
