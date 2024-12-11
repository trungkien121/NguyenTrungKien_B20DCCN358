package com.example.hieuthuoc.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.hieuthuoc.entity.DonHang;
import com.example.hieuthuoc.entity.DonHang.TrangThaiGiaoHang;

@Repository
public interface DonHangRepo extends JpaRepository<DonHang, Integer> {
	
	Page<DonHang> findByTrangThaiGiaoHang(TrangThaiGiaoHang trangThaiGiaoHang, Pageable pageable);

	Page<DonHang> findAll(Pageable pageable);
	
//    @Query("SELECT SUM(d.tongTien) FROM DonHang d WHERE FUNCTION('DATE', d.createdAt) = :ngay")
//    BigDecimal getDoanhThuTheoNgay(@Param("ngay") LocalDate ngay);
//
//    @Query("SELECT SUM(d.tongTien) FROM DonHang d WHERE FUNCTION('MONTH', d.createdAt) = :thang AND FUNCTION('YEAR', d.createdAt) = :nam")
//    BigDecimal getDoanhThuTheoThang(@Param("thang") int thang, @Param("nam") int nam);
//
//    @Query("SELECT SUM(d.tongTien) FROM DonHang d WHERE FUNCTION('YEAR', d.createdAt) = :nam")
//    BigDecimal getDoanhThuTheoNam(@Param("nam") int nam);
}
