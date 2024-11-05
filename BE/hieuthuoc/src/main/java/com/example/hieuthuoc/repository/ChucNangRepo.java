package com.example.hieuthuoc.repository;

import com.example.hieuthuoc.entity.ChucNang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChucNangRepo extends JpaRepository<ChucNang, Integer> {}
