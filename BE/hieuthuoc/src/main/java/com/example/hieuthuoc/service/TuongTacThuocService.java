package com.example.hieuthuoc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.entity.TuongTacThuoc;
import com.example.hieuthuoc.repository.TuongTacThuocRepo;

public interface TuongTacThuocService {
	ResponseDTO<TuongTacThuoc> checkThanhPhan(String hoatChat1, String hoatChat2);
}

@Service
class TuongTacThuocImpl implements TuongTacThuocService {

	@Autowired
	TuongTacThuocRepo tuongTacThuocRepo;

	@Override
	public ResponseDTO<TuongTacThuoc> checkThanhPhan(String hoatChat1, String hoatChat2) {

		TuongTacThuoc tuongTacThuoc = tuongTacThuocRepo.findByHoatChatCombination(hoatChat1, hoatChat2);
		if (tuongTacThuoc != null) {
			return ResponseDTO.<TuongTacThuoc>builder().status(200).msg("Thành công.").data(tuongTacThuoc).build();
		}
		return ResponseDTO.<TuongTacThuoc>builder().status(404).msg("Không tìm thấy tương tác giữa hai hoạt chất này.").build();

	}

}