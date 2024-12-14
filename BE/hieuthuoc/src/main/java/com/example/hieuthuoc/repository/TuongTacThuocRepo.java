package com.example.hieuthuoc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.hieuthuoc.entity.TuongTacThuoc;

public interface TuongTacThuocRepo extends JpaRepository<TuongTacThuoc, Integer> {
	@Query("SELECT t FROM TuongTacThuoc t WHERE " + "(t.hoatChat1 = :hoatChat1 AND t.hoatChat2 = :hoatChat2) OR "
			+ "(t.hoatChat1 = :hoatChat2 AND t.hoatChat2 = :hoatChat1)")
	TuongTacThuoc findByHoatChatCombination(@Param("hoatChat1") String hoatChat1, @Param("hoatChat2") String hoatChat2);

}
