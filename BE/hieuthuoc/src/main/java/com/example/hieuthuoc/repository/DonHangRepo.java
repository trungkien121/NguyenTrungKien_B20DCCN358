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

    @Query("SELECT d FROM DonHang d WHERE d.trangThaiGiaoHang = :trangThaiGiaoHang AND d.khachHang.id = :khachHangId")
    Page<DonHang> findByTrangThaiGiaoHang(@Param("trangThaiGiaoHang") TrangThaiGiaoHang trangThaiGiaoHang,
                                          @Param("khachHangId") int khachHangId, Pageable pageable);

    Page<DonHang> findAll(Pageable pageable);
    
    @Query("SELECT d FROM DonHang d WHERE d.khachHang.id = :khachHangId")
    Page<DonHang> findByNguoiDungId(@Param("khachHangId") int khachHangId, Pageable pageable);

	@Query("SELECT new com.example.hieuthuoc.dto.DoanhThuDTO( " + "HOUR(dh.createdAt), "
			+ "SUM(CASE WHEN dh.trangThaiGiaoHang != 'TRA_HANG' THEN dh.tongTien ELSE 0 END), " + // Tổng doanh thu của
																									// các đơn hàng đã
																									// thanh toán và
																									// chưa trả lại
			"COUNT(CASE WHEN dh.trangThaiGiaoHang != 'TRA_HANG' THEN 1 ELSE NULL END), " + // Tổng số đơn hàng đã thanh
																							// toán và chưa trả lại
			"SUM(CASE WHEN dh.trangThaiGiaoHang = 'TRA_HANG' THEN 1 ELSE 0 END)) " + // Tổng số đơn hàng trả lại (bao
																						// gồm cả đã thanh toán và chưa
																						// thanh toán)
			"FROM DonHang dh " + "WHERE dh.trangThaiThanhToan = 'DA_THANH_TOAN' " + // Lọc các đơn hàng đã thanh toán
			"AND DATE(dh.createdAt) = :ngay " + // Lọc theo ngày
			"GROUP BY HOUR(dh.createdAt) " + // Nhóm theo giờ
			"ORDER BY HOUR(dh.createdAt)")
	List<DoanhThuDTO> doanhThuTheoNgay(@Param("ngay") Date ngay);

	@Query("SELECT new com.example.hieuthuoc.dto.DoanhThuDTO( " + "DAY(dh.createdAt), " + // Lọc theo tháng
			"SUM(CASE WHEN dh.trangThaiGiaoHang != 'TRA_HANG' THEN dh.tongTien ELSE 0 END), " + // Tổng doanh thu của
																								// các đơn hàng đã thanh
																								// toán và chưa trả lại
			"COUNT(CASE WHEN dh.trangThaiGiaoHang != 'TRA_HANG' THEN 1 ELSE NULL END), " + // Tổng số đơn hàng đã thanh
																							// toán và chưa trả lại
			"SUM(CASE WHEN dh.trangThaiGiaoHang = 'TRA_HANG' THEN 1 ELSE 0 END)) " + // Tổng số đơn hàng trả lại
			"FROM DonHang dh " + "WHERE dh.trangThaiThanhToan = 'DA_THANH_TOAN' " + // Lọc các đơn hàng đã thanh toán
			"AND YEAR(dh.createdAt) = :nam " + // Lọc theo năm
			"AND MONTH(dh.createdAt) = :thang " + // Lọc theo tháng
			"GROUP BY DAY(dh.createdAt) " + // Nhóm theo tháng
			"ORDER BY DAY(dh.createdAt)")
	List<DoanhThuDTO> doanhThuTheoThang(@Param("nam") int nam, @Param("thang") int thang);

	@Query("SELECT new com.example.hieuthuoc.dto.DoanhThuDTO( " + "MONTH(dh.createdAt), " + // Lọc theo năm
			"SUM(CASE WHEN dh.trangThaiGiaoHang != 'TRA_HANG' THEN dh.tongTien ELSE 0 END), " + // Tổng doanh thu của
																								// các đơn hàng đã thanh
																								// toán và chưa trả lại
			"COUNT(CASE WHEN dh.trangThaiGiaoHang != 'TRA_HANG' THEN 1 ELSE NULL END), " + // Tổng số đơn hàng đã thanh
																							// toán và chưa trả lại
			"SUM(CASE WHEN dh.trangThaiGiaoHang = 'TRA_HANG' THEN 1 ELSE 0 END)) " + // Tổng số đơn hàng trả lại
			"FROM DonHang dh " + "WHERE dh.trangThaiThanhToan = 'DA_THANH_TOAN' " + // Lọc các đơn hàng đã thanh toán
			"AND YEAR(dh.createdAt) = :nam " + // Lọc theo năm
			"GROUP BY MONTH(dh.createdAt) " + // Nhóm theo năm
			"ORDER BY MONTH(dh.createdAt)")
	List<DoanhThuDTO> doanhThuTheoNam(@Param("nam") int nam);

}
