package com.example.hieuthuoc.repository;

import com.example.hieuthuoc.entity.DoiTuongSdThuoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoiTuongSdThuocRepo extends JpaRepository<DoiTuongSdThuoc, Integer> {}
