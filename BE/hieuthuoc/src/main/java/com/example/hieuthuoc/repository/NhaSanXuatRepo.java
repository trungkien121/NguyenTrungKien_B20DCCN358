package com.example.hieuthuoc.repository;

import com.example.hieuthuoc.entity.NhaSanXuat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NhaSanXuatRepo extends JpaRepository<NhaSanXuat, Integer> {}
