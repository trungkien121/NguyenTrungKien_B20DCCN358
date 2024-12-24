package com.example.hieuthuoc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.hieuthuoc.entity.DanhMucThuoc;

@Repository
public interface DanhMucThuocRepo extends JpaRepository<DanhMucThuoc, Integer> {
	boolean existsByTenDanhMuc(String tenDanhMuc);

	@Query("SELECT d FROM DanhMucThuoc d WHERE LOWER(d.tenDanhMuc) LIKE LOWER(CONCAT('%', :tenDanhMuc, '%'))")
	List<DanhMucThuoc> searchByTenDanhMuc(@Param("tenDanhMuc") String tenDanhMuc);

    @Query("SELECT dm FROM DanhMucThuoc dm JOIN FETCH dm.loaiThuocs")
    List<DanhMucThuoc> findAllWithLoaiThuocs();
}
