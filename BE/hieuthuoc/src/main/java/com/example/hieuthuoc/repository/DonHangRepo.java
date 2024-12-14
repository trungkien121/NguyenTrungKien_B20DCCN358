package com.example.hieuthuoc.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.hieuthuoc.dto.DoanhThuDTO;
import com.example.hieuthuoc.entity.DonHang;
import com.example.hieuthuoc.entity.DonHang.TrangThaiGiaoHang;

@Repository
public interface DonHangRepo extends JpaRepository<DonHang, Integer> {

	Page<DonHang> findByTrangThaiGiaoHang(TrangThaiGiaoHang trangThaiGiaoHang, Pageable pageable);

	Page<DonHang> findAll(Pageable pageable);

//	@Query("SELECT new com.example.hieuthuoc.dto.DoanhThuDTO( " + "FUNCTION('HOUR', dh.createdAt), "
//			+ "SUM(dh.tongTien), " + "COUNT(dh.id)) " + "FROM DonHang dh "
//			+ "WHERE dh.trangThaiThanhToan = 'DA_THANH_TOAN' " + "AND FUNCTION('DATE', dh.createdAt) = :ngay "
//			+ "GROUP BY FUNCTION('HOUR', dh.createdAt) " + "ORDER BY FUNCTION('HOUR', dh.createdAt)")
//	List<DoanhThuDTO> doanhThuTheoNgay(@Param("ngay") Date ngay);
//
//	@Query("SELECT new com.example.hieuthuoc.dto.DoanhThuDTO( " + "FUNCTION('DAY', dh.createdAt), "
//			+ "SUM(dh.tongTien), " + "COUNT(dh.id)) " + "FROM DonHang dh "
//			+ "WHERE dh.trangThaiThanhToan = 'DA_THANH_TOAN' " + "AND FUNCTION('YEAR', dh.createdAt) = :nam "
//			+ "AND FUNCTION('MONTH', dh.createdAt) = :thang " + "GROUP BY FUNCTION('DAY', dh.createdAt) "
//			+ "ORDER BY FUNCTION('DAY', dh.createdAt)")
//	List<DoanhThuDTO> doanhThuTheoThang(@Param("nam") int nam, @Param("thang") int thang);
//
//	@Query("SELECT new com.example.hieuthuoc.dto.DoanhThuDTO( " + "FUNCTION('MONTH', dh.createdAt), "
//			+ "SUM(dh.tongTien), " + "COUNT(dh.id)) " + "FROM DonHang dh "
//			+ "WHERE dh.trangThaiThanhToan = 'DA_THANH_TOAN' " + "AND FUNCTION('YEAR', dh.createdAt) = :nam "
//			+ "GROUP BY FUNCTION('MONTH', dh.createdAt) " + "ORDER BY FUNCTION('MONTH', dh.createdAt)")
//	List<DoanhThuDTO> doanhThuTheoNam(@Param("nam") int nam);

}
