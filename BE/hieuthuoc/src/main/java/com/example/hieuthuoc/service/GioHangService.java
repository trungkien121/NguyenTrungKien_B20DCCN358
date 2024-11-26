package com.example.hieuthuoc.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.hieuthuoc.dto.ChiTietGioHangDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.entity.ChiTietGioHang;
import com.example.hieuthuoc.entity.GioHang;
import com.example.hieuthuoc.repository.ChiTietGioHangRepo;
import com.example.hieuthuoc.repository.GioHangRepo;
import com.example.hieuthuoc.repository.ThuocRepo;

public interface GioHangService {
	
	ResponseDTO<GioHang> getByNguoiDungId(int nguoiDungId);

	ResponseDTO<ChiTietGioHang> createThuoc(ChiTietGioHangDTO chiTietGioHangDTO);

	ResponseDTO<ChiTietGioHang> updateThuoc(ChiTietGioHangDTO chiTietGioHangDTO);

	ResponseDTO<Void> deleteThuoc(int id);
}

@Service
class GioHangServiceImpl implements GioHangService {

	@Autowired
	private GioHangRepo gioHangRepo;

	@Autowired
	private ChiTietGioHangRepo chiTietGioHangRepo;

	@Autowired
	private ThuocRepo thuocRepo;

	private ModelMapper modelMapper = new ModelMapper();

//    Lấy thông tin giỏ hàng của một người dùng dựa trên ID người dùng.
	@Override
	public ResponseDTO<GioHang> getByNguoiDungId(int nguoiDungId) {
		var gioHangOpt = gioHangRepo.findByKhachHangId(nguoiDungId);
		if (gioHangOpt.isEmpty()) {
			return ResponseDTO.<GioHang>builder().status(404)
					.msg("Không tìm thấy giỏ hàng cho người dùng ID: " + nguoiDungId).build();
		}
		GioHang gioHang = gioHangOpt.get();

		return ResponseDTO.<GioHang>builder().status(200).msg("Thành công").data(gioHang).build();
	}

//	Thêm sản phẩm vào giỏ hàng.
	@Override
	@Transactional
	public ResponseDTO<ChiTietGioHang> createThuoc(ChiTietGioHangDTO chiTietGioHangDTO) {
		ChiTietGioHang chiTietGioHang = modelMapper.map(chiTietGioHangDTO, ChiTietGioHang.class);
		// Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
		if (chiTietGioHangRepo.existsByGioHangIdAndThuocId(chiTietGioHangDTO.getGioHangId(),
				chiTietGioHangDTO.getThuocId())) {
			chiTietGioHang = chiTietGioHangRepo.findByThuocId(chiTietGioHangDTO.getThuocId());
			chiTietGioHang.setSoLuong(chiTietGioHang.getSoLuong() + chiTietGioHangDTO.getSoLuong());
		}

		chiTietGioHang.setGioHang(gioHangRepo.findById(chiTietGioHangDTO.getGioHangId()).get());
		chiTietGioHang.setThuoc(thuocRepo.findById(chiTietGioHangDTO.getThuocId()).get());

		chiTietGioHangRepo.save(chiTietGioHang);
		return ResponseDTO.<ChiTietGioHang>builder().status(200).msg("Thành công").data(chiTietGioHang).build();
	}

//	 Cập nhật thông tin sản phẩm trong giỏ hàng.
	@Override
	@Transactional
	public ResponseDTO<ChiTietGioHang> updateThuoc(ChiTietGioHangDTO chiTietGioHangDTO) {
		Optional<ChiTietGioHang> chiTietOpt = chiTietGioHangRepo.findById(chiTietGioHangDTO.getId());
		if (chiTietOpt.isEmpty()) {
			return ResponseDTO.<ChiTietGioHang>builder().status(404).msg("Không tìm thấy sản phẩm trong giỏ hàng")
					.build();
		}

		ChiTietGioHang chiTietGioHang = chiTietOpt.get();
		chiTietGioHang.setSoLuong(chiTietGioHangDTO.getSoLuong());
		chiTietGioHangRepo.save(chiTietGioHang);

		return ResponseDTO.<ChiTietGioHang>builder().status(200).msg("Thành công").data(chiTietGioHang).build();
	}

//	Xóa sản phẩm khỏi giỏ hàng.
	@Override
	@Transactional
	public ResponseDTO<Void> deleteThuoc(int id) {
		chiTietGioHangRepo.deleteById(id);
		return ResponseDTO.<Void>builder().status(200).msg("Thành công").build();
	}
}
