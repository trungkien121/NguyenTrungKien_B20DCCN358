package com.example.hieuthuoc.repository;

import com.example.hieuthuoc.entity.DoiTuong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoiTuongRepo extends JpaRepository<DoiTuong, Integer> {}
