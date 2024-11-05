package com.example.hieuthuoc.repository;

import com.example.hieuthuoc.entity.ThongBao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThongBaoRepo extends JpaRepository<ThongBao, Integer> {}
