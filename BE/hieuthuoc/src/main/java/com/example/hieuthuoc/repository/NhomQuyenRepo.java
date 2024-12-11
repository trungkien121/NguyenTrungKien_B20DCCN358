package com.example.hieuthuoc.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.hieuthuoc.entity.NhomQuyen;

@Repository
public interface NhomQuyenRepo extends JpaRepository<NhomQuyen, Integer> {

	NhomQuyen findByTenNhomQuyen(String tenNhomQuyen);

	Boolean existsByTenNhomQuyen(String tenNhomQuyen);

	@Query("SELECT nq FROM NhomQuyen nq WHERE nq.tenNhomQuyen like :x")
	Page<NhomQuyen> getByTenNhomQuyen(@Param("x") String tenNhomQuyen, Pageable pageable);
}
