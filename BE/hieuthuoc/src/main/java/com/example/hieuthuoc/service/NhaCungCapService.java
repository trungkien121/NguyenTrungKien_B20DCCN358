package com.example.hieuthuoc.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.hieuthuoc.dto.NhaCungCapDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.entity.NhaCungCap;
import com.example.hieuthuoc.repository.NhaCungCapRepo;

public interface NhaCungCapService {
	ResponseDTO<List<NhaCungCap>> getAll();

	ResponseDTO<List<NhaCungCap>> searchByTenNhaCungCap(String tenNhaCungcap);

	ResponseDTO<NhaCungCap> create(NhaCungCapDTO nhaCungCapDTO);

	ResponseDTO<NhaCungCap> update(NhaCungCapDTO nhaCungCapDTO);

	ResponseDTO<Void> delete(Integer id);
}

@Service
class NhaCungCapServiceImpl implements NhaCungCapService {

	@Autowired
	private NhaCungCapRepo nhaCungCapRepo;

	ModelMapper modelMapper = new ModelMapper();

	@Override
	public ResponseDTO<List<NhaCungCap>> getAll() {
		List<NhaCungCap> nhaCungCaps = nhaCungCapRepo.findAll();
		return ResponseDTO.<List<NhaCungCap>>builder().status(200).msg("Thành công").data(nhaCungCaps).build();
	}


	@Override
	public ResponseDTO<List<NhaCungCap>> searchByTenNhaCungCap(String tenNhaCungcap) {
		List<NhaCungCap> nhaCungCaps = nhaCungCapRepo.searchByTenNhaCungCap(tenNhaCungcap);
		if (nhaCungCaps != null && !nhaCungCaps.isEmpty()) {
			return ResponseDTO.<List<NhaCungCap>>builder().status(200).msg("Thành công").data(nhaCungCaps).build();
		}
		return ResponseDTO.<List<NhaCungCap>>builder().status(409).msg("Nhà sản xuất không tồn tại").build();

	}
	
	@Override
	@Transactional
	public ResponseDTO<NhaCungCap> create(NhaCungCapDTO nhaCungCapDTO) {
		NhaCungCap nhaCungCap = modelMapper.map(nhaCungCapDTO, NhaCungCap.class);
		if (nhaCungCapRepo.existsByMaNCC(nhaCungCap.getMaNCC())) {
			return ResponseDTO.<NhaCungCap>builder().status(409).msg("Nhà cung cấp đã tồn tại").build();
		}
		return ResponseDTO.<NhaCungCap>builder().status(201).msg("Thành công").data(nhaCungCapRepo.save(nhaCungCap))
				.build();
	}

	@Override
	@Transactional
	public ResponseDTO<NhaCungCap> update(NhaCungCapDTO nhaCungCapDTO) {
		NhaCungCap nhaCungCap = modelMapper.map(nhaCungCapDTO, NhaCungCap.class);
		Optional<NhaCungCap> currentNhaCungCap = nhaCungCapRepo.findById(nhaCungCap.getId());

		if (!currentNhaCungCap.isPresent()) {
			return ResponseDTO.<NhaCungCap>builder().status(404).msg("Không tìm thấy nhà cung cấp").build();
		}
		if (nhaCungCap.getMaNCC().equals(currentNhaCungCap.get().getMaNCC()) == false
				&& nhaCungCapRepo.existsByMaNCC(nhaCungCap.getMaNCC())) {
			return ResponseDTO.<NhaCungCap>builder().status(409).msg("Mã Nhà cung cấp đã tồn tại").build();
		}
		NhaCungCap updatedNhaCungCap = nhaCungCapRepo.save(nhaCungCap);
		return ResponseDTO.<NhaCungCap>builder().status(200).msg("Thành công").data(updatedNhaCungCap).build();
	}

	@Override
	@Transactional
	public ResponseDTO<Void> delete(Integer id) {
		nhaCungCapRepo.deleteById(id);
		return ResponseDTO.<Void>builder().status(200).msg("Thành công").build();

	}

}
