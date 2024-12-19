package com.example.hieuthuoc.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.hieuthuoc.entity.ChiTietDonHang;
import com.example.hieuthuoc.entity.Thuoc;

@Repository
public interface ChiTietDonHangRepo extends JpaRepository<ChiTietDonHang, Integer> {
	@Query("SELECT t " +
		       "FROM Thuoc t " +
		       "LEFT JOIN ChiTietDonHang c ON t.id = c.thuoc.id " +
		       "LEFT JOIN DonHang d ON c.donHang.id = d.id " +
		       "WHERE d.trangThaiThanhToan = 'DA_THANH_TOAN' " +
		       "GROUP BY t " +
		       "ORDER BY COALESCE(SUM(c.soLuong), 0) DESC")
		Page<Thuoc> findAllThuocBanChay(Pageable pageable);

}
