package com.example.hieuthuoc.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.hieuthuoc.dto.DoiTuongDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.entity.DoiTuong;
import com.example.hieuthuoc.repository.DoiTuongRepo;

public interface DoiTuongService {
	ResponseDTO<List<DoiTuong>> getAll();
	
    ResponseDTO<List<DoiTuong>> searchByTenDoiTuong(String tenDoiTuong);

	ResponseDTO<DoiTuong> create(DoiTuongDTO doiTuongDTO);

	ResponseDTO<DoiTuong> update(DoiTuongDTO doiTuongDTO);

	ResponseDTO<Void> delete(Integer id);
}

@Service
class DoiTuongServiceImpl implements DoiTuongService {

	@Autowired
	private DoiTuongRepo doiTuongRepo;

	ModelMapper modelMapper = new ModelMapper();

	@Override
	public ResponseDTO<List<DoiTuong>> getAll() {
		List<DoiTuong> doiTuongs = doiTuongRepo.findAll();
		return ResponseDTO.<List<DoiTuong>>builder().status(200).msg("Thanh công").data(doiTuongs).build();
	}

	@Override
	public ResponseDTO<List<DoiTuong>> searchByTenDoiTuong(String tenDoiTuong) {
		List<DoiTuong> doiTuongs = doiTuongRepo.searchByTenDoiTuong(tenDoiTuong);
		if (doiTuongs != null && !doiTuongs.isEmpty()) {
			return ResponseDTO.<List<DoiTuong>>builder().status(200).msg("Thành công").data(doiTuongs).build();
		}
		return ResponseDTO.<List<DoiTuong>>builder().status(409).msg("Nhà sản xuất không tồn tại").build();

	}

	@Override
	@Transactional
	public ResponseDTO<DoiTuong> create(DoiTuongDTO doiTuongDTO) {
		DoiTuong doiTuong = modelMapper.map(doiTuongDTO, DoiTuong.class);
		if (doiTuongRepo.existsByTenDoiTuong(doiTuong.getTenDoiTuong())) {
			return ResponseDTO.<DoiTuong>builder().status(409).msg("Đối tượng đã tồn tại").build();
		}
		return ResponseDTO.<DoiTuong>builder().status(200).msg("Thanh công").data(doiTuongRepo.save(doiTuong)).build();
	}

	@Override
	@Transactional
	public ResponseDTO<DoiTuong> update(DoiTuongDTO doiTuongDTO) {
		DoiTuong doiTuong = modelMapper.map(doiTuongDTO, DoiTuong.class);
		DoiTuong currentDoiTuong = doiTuongRepo.findById(doiTuong.getId()).orElse(null);
		if (currentDoiTuong != null) {
			return ResponseDTO.<DoiTuong>builder().status(200).msg("Thanh công").data(doiTuongRepo.save(doiTuong)).build();
		}
		return ResponseDTO.<DoiTuong>builder().status(409).msg("Đối tượng không tồn tại").build();
	}

	@Override
	@Transactional
	public ResponseDTO<Void> delete(Integer id) {
		doiTuongRepo.deleteById(id);
		return ResponseDTO.<Void>builder().status(200).msg("Thành công").build();
	}

}
