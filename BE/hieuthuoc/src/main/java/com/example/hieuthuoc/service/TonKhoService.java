package com.example.hieuthuoc.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.example.hieuthuoc.dto.PageDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.dto.SearchTonKhoDTO;
import com.example.hieuthuoc.dto.TonKhoDTO;
import com.example.hieuthuoc.entity.Thuoc;
import com.example.hieuthuoc.entity.TonKho;
import com.example.hieuthuoc.repository.ThuocRepo;
import com.example.hieuthuoc.repository.TonKhoRepo;

public interface TonKhoService {
	ResponseDTO<TonKho> update(TonKhoDTO tonKhoDTO);

	ResponseDTO<PageDTO<List<TonKho>>> search(SearchTonKhoDTO searchTonKhoDTO);
}

@Service
class TonKhoServiceImpl implements TonKhoService {

	@Autowired
	private TonKhoRepo tonKhoRepo;

	@Autowired
	ThuocRepo thuocRepo;

	ModelMapper modelMapper = new ModelMapper();

	// Cập nhật tồn kho
	@Override
	public ResponseDTO<TonKho> update(TonKhoDTO tonKhoDTO) {
		Optional<TonKho> existingTonKho = tonKhoRepo.findById(tonKhoDTO.getId());
		if (!existingTonKho.isPresent()) {
			return ResponseDTO.<TonKho>builder().status(404).msg("Tồn kho không tồn tại.").build();
		}

		Thuoc thuoc = thuocRepo.findById(tonKhoDTO.getThuocId()).get();
		TonKho tonKho = modelMapper.map(tonKhoDTO, TonKho.class); // Cập nhật thông tin tồn kho từ DTO

		tonKho.setThuoc(thuoc);

		tonKhoRepo.save(tonKho);

		return ResponseDTO.<TonKho>builder().status(200).msg("Thành công.").data(tonKho).build();
	}

	@Override
	public ResponseDTO<PageDTO<List<TonKho>>> search(SearchTonKhoDTO searchTonKhoDTO) {
		Sort sortBy = Sort.by("createdAt").ascending();

		if (StringUtils.hasText(searchTonKhoDTO.getSortedField())) {
			sortBy = Sort.by(searchTonKhoDTO.getSortedField()).ascending();
		}

		if (searchTonKhoDTO.getCurrentPage() == null) {
			searchTonKhoDTO.setCurrentPage(0);
		}

		if (searchTonKhoDTO.getSize() == null) {
			searchTonKhoDTO.setSize(20);
		}

		if (searchTonKhoDTO.getTenThuoc() == null) {
			searchTonKhoDTO.setTenThuoc("");
		}
		PageRequest pageRequest = PageRequest.of(searchTonKhoDTO.getCurrentPage(), searchTonKhoDTO.getSize(), sortBy);
		Page<TonKho> page = tonKhoRepo.search(searchTonKhoDTO.getTenThuoc(), searchTonKhoDTO.getSoLo(),
				searchTonKhoDTO.getTenNhaSanXuat(), pageRequest);

		PageDTO<List<TonKho>> pageDTO = new PageDTO<>();
		pageDTO.setTotalElements(page.getTotalElements());
		pageDTO.setTotalPages(page.getTotalPages());

		List<TonKho> tonKhos = page.getContent();

		pageDTO.setData(tonKhos);

		return ResponseDTO.<PageDTO<List<TonKho>>>builder().status(200).msg("Thanh công").data(pageDTO).build();
	}
}
