package com.example.hieuthuoc.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.hieuthuoc.entity.ThongBao;
import com.example.hieuthuoc.entity.ThongBao.LoaiThongBao;

@Repository
public interface ThongBaoRepo extends JpaRepository<ThongBao, Integer> {

	@Query("SELECT tb FROM ThongBao tb " +
		       "LEFT JOIN tb.nguoiNhan ng " +
		       "WHERE (ng.id = :nguoiDungId " + // Điều kiện 1: Thông báo cho người dùng cụ thể
		       "OR tb.loaiThongBao = 'HE_THONG' " + // Điều kiện 2: Thông báo loại hệ thống
		       "OR tb.loaiThongBao = 'SU_KIEN' " + // Điều kiện 3: Thông báo loại sự kiện
		       "OR tb.loaiThongBao = 'KHUYEN_MAI')") // Điều kiện 4: Thông báo loại khuyến mãi
		Page<ThongBao> findByNguoiDungId(@Param("nguoiDungId") Integer nguoiDungId, Pageable pageable);

	
	Page<ThongBao> findByLoaiThongBao(LoaiThongBao loaiThongBao, Pageable pageable);
	
	Page<ThongBao> findAll(Pageable pageable);

}
