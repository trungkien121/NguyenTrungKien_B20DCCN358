package com.example.hieuthuoc.repository;

import com.example.hieuthuoc.entity.NhaCungCap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NhaCungCapRepo extends JpaRepository<NhaCungCap, Integer> {}
