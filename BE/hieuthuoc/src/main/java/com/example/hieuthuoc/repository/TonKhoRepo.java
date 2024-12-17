package com.example.hieuthuoc.repository;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.hieuthuoc.entity.TonKho;

@Repository
public interface TonKhoRepo extends JpaRepository<TonKho, Integer> {

	@Query("SELECT tk FROM TonKho tk WHERE tk.thuoc.id = :thuocId AND tk.hanSuDung >= :ngayCanSoSanh "
			+ "ORDER BY tk.hanSuDung ASC")
	TonKho findNearestTonKhoByThuocIdAndHanSuDungBefore(@Param("thuocId") Integer thuocId,
			@Param("ngayCanSoSanh") Date ngayCanSoSanh);

	@Query("SELECT t FROM TonKho t " + "JOIN t.thuoc thuoc " + "JOIN thuoc.nhaSanXuat nhaSanXuat "
			+ "WHERE (:tenThuoc IS NULL OR thuoc.tenThuoc LIKE %:tenThuoc%) "
			+ "AND (:soLo IS NULL OR t.soLo LIKE %:soLo%) "
			+ "AND (:tenNhaSanXuat IS NULL OR nhaSanXuat.tenNhaSanXuat LIKE %:tenNhaSanXuat%) " + "ORDER BY t.createdAt DESC")
	Page<TonKho> search(@Param("tenThuoc") String tenThuoc, @Param("soLo") String soLo,
			@Param("tenNhaSanXuat") String tenNhaSanXuat, Pageable pageable);
}
