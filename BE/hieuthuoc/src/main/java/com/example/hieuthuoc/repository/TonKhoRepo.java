package com.example.hieuthuoc.repository;

import com.example.hieuthuoc.entity.TonKho;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TonKhoRepo extends JpaRepository<TonKho, Integer> {}
