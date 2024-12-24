package com.example.hieuthuoc.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.hieuthuoc.dto.NhaSanXuatDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.entity.NhaSanXuat;
import com.example.hieuthuoc.repository.NhaSanXuatRepo;

public interface NhaSanXuatService {
    ResponseDTO<List<NhaSanXuat>> getAll();
    
    ResponseDTO<List<NhaSanXuat>> searchByTenNhaSanXuat(String tenNhaSanXuat);

    ResponseDTO<NhaSanXuat> create(NhaSanXuatDTO nhaSanXuatDTO);

    ResponseDTO<NhaSanXuat> update(NhaSanXuatDTO nhaSanXuatDTO);

    ResponseDTO<Void> delete(Integer id);
}

@Service
class NhaSanXuatServiceImpl implements NhaSanXuatService {

    @Autowired
    private NhaSanXuatRepo nhaSanXuatRepo;

    ModelMapper modelMapper = new ModelMapper();

    @Override
    public ResponseDTO<List<NhaSanXuat>> getAll() {
        List<NhaSanXuat> nhaSanXuats = nhaSanXuatRepo.findAll();
        return ResponseDTO.<List<NhaSanXuat>>builder().status(200).msg("Thành công").data(nhaSanXuats).build();
    }
    

	@Override
	public ResponseDTO<List<NhaSanXuat>> searchByTenNhaSanXuat(String tenNhaSanXuat) {
		List<NhaSanXuat> nhaSanXuats = nhaSanXuatRepo.searchByTenNhaSanXuat(tenNhaSanXuat);
		if (nhaSanXuats != null && !nhaSanXuats.isEmpty()) {
			return ResponseDTO.<List<NhaSanXuat>>builder().status(200).msg("Thành công").data(nhaSanXuats).build();
		}
		return ResponseDTO.<List<NhaSanXuat>>builder().status(409).msg("Nhà sản xuất không tồn tại").build();
	}

    @Override
    @Transactional
    public ResponseDTO<NhaSanXuat> create(NhaSanXuatDTO nhaSanXuatDTO) {
        NhaSanXuat nhaSanXuat = modelMapper.map(nhaSanXuatDTO, NhaSanXuat.class);
        if (nhaSanXuatRepo.existsByMaNSX(nhaSanXuat.getMaNSX())) {
            return ResponseDTO.<NhaSanXuat>builder().status(409).msg("Nhà sản xuất đã tồn tại").build();
        }
        return ResponseDTO.<NhaSanXuat>builder().status(201).msg("Thành công").data(nhaSanXuatRepo.save(nhaSanXuat)).build();
    }

    @Override
    @Transactional
    public ResponseDTO<NhaSanXuat> update(NhaSanXuatDTO nhaSanXuatDTO) {
        NhaSanXuat nhaSanXuat = modelMapper.map(nhaSanXuatDTO, NhaSanXuat.class);
        Optional<NhaSanXuat> currentNhaSanXuat = nhaSanXuatRepo.findById(nhaSanXuat.getId());
        if (currentNhaSanXuat.isPresent()) {
            NhaSanXuat updatedNhaSanXuat = nhaSanXuatRepo.save(nhaSanXuat);
            return ResponseDTO.<NhaSanXuat>builder().status(200).msg("Thành công").data(updatedNhaSanXuat).build();
        }
        return ResponseDTO.<NhaSanXuat>builder().status(404).msg("Không tìm thấy nhà sản xuất").build();
    }

    @Override
    @Transactional
    public ResponseDTO<Void> delete(Integer id) {
        nhaSanXuatRepo.deleteById(id);
        return ResponseDTO.<Void>builder().status(200).msg("Thành công").build();
    }

}
