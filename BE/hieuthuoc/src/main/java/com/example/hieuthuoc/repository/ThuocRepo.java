package com.example.hieuthuoc.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.hieuthuoc.entity.Thuoc;

@Repository
public interface ThuocRepo extends JpaRepository<Thuoc, Integer> {

	// Tìm thuốc theo tên
    Page<Thuoc> findByTenThuoc(String tenThuoc, Pageable pageable); 
    
    Boolean existsByMaThuoc(String maThuoc);
    Boolean existsByTenThuoc(String tenThuoc);
    
//    Search thuoc
    @Query("SELECT t FROM Thuoc t " +
    	       "LEFT JOIN t.loaiThuoc lt " +
    	       "LEFT JOIN t.nhaSanXuat nsx " +
    	       "LEFT JOIN t.danhMucThuoc dmt " +
    	       "WHERE (:keyWord IS NULL OR (LOWER(t.tenThuoc) LIKE LOWER(CONCAT('%', :keyWord, '%')) " +
    	       "OR LOWER(t.maThuoc) LIKE LOWER(CONCAT('%', :keyWord, '%')))) " +
    	       "AND (:loaiThuoc IS NULL OR LOWER(lt.tenLoai) LIKE LOWER(CONCAT('%', :loaiThuoc, '%'))) " +
    	       "AND (:nhaSanXuat IS NULL OR LOWER(nsx.tenNhaSanXuat) LIKE LOWER(CONCAT('%', :nhaSanXuat, '%'))) " +
    	       "AND (:danhMucThuoc IS NULL OR LOWER(dmt.tenDanhMuc) LIKE LOWER(CONCAT('%', :danhMucThuoc, '%'))) " +
    	       "AND (:doiTuongSd IS NULL OR LOWER(t.doiTuongSd) LIKE LOWER(CONCAT('%', :doiTuongSd, '%'))) " +
    	       "AND (:maxGiaBan IS NULL OR t.giaBan <= :maxGiaBan)")
    	Page<Thuoc> search(
    	       @Param("keyWord") String keyWord, // Tìm kiếm chung cho tên thuốc và mã thuốc
    	       @Param("loaiThuoc") String loaiThuoc,
    	       @Param("nhaSanXuat") String nhaSanXuat,
    	       @Param("danhMucThuoc") String danhMucThuoc,
    	       @Param("doiTuongSd") String doiTuongSd,
    	       @Param("maxGiaBan") Double maxGiaBan,
    	       Pageable pageable);

}
