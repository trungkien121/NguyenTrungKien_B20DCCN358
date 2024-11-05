package com.example.hieuthuoc.repository;

import com.example.hieuthuoc.entity.ChiTietChucNang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChiTietChucNangRepo extends JpaRepository<ChiTietChucNang, Integer> {
    
}
