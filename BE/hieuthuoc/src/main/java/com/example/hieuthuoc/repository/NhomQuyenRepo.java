package com.example.hieuthuoc.repository;

import com.example.hieuthuoc.entity.NhomQuyen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NhomQuyenRepo extends JpaRepository<NhomQuyen, Integer> {
	
	NhomQuyen findByTenNhomQuyen(String tenNhomQuyen);
}
