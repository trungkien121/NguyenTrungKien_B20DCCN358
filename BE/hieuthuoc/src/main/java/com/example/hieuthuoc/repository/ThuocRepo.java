package com.example.hieuthuoc.repository;

import com.example.hieuthuoc.entity.Thuoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThuocRepo extends JpaRepository<Thuoc, Integer> {

    List<Thuoc> findByTenThuoc(String tenThuoc); // Tìm thuốc theo tên
}
