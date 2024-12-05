package com.example.hieuthuoc.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.example.hieuthuoc.dto.NhomQuyenDTO;
import com.example.hieuthuoc.dto.PageDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.dto.SearchDTO;
import com.example.hieuthuoc.entity.ChucNang;
import com.example.hieuthuoc.entity.NhomQuyen;
import com.example.hieuthuoc.repository.ChucNangRepo;
import com.example.hieuthuoc.repository.NhomQuyenRepo;

public interface NhomQuyenService {

	ResponseDTO<NhomQuyen> create(NhomQuyenDTO nhomQuyenDTO);

	ResponseDTO<NhomQuyen> update(NhomQuyenDTO nhomQuyenDTO);

	ResponseDTO<Void> delete(Integer id);

	ResponseDTO<NhomQuyen> getById(Integer id);

	ResponseDTO<PageDTO<List<NhomQuyen>>> getByTenNhomQuyen(SearchDTO searchDTO);
}

@Service
class NhomQuyenServiceImpl implements NhomQuyenService {

	@Autowired
	private NhomQuyenRepo nhomQuyenRepo;

	@Autowired
	private ChucNangRepo chucNangRepo;

	private final ModelMapper modelMapper = new ModelMapper();

	@Override
	@Transactional
	public ResponseDTO<NhomQuyen> create(NhomQuyenDTO nhomQuyenDTO) {
		if (nhomQuyenRepo.existsByTenNhomQuyen(nhomQuyenDTO.getTenNhomQuyen())) {
			return ResponseDTO.<NhomQuyen>builder().status(409).msg("Nhóm quyền đã tồn tại").build();
		}
		NhomQuyen nhomQuyen = modelMapper.map(nhomQuyenDTO, NhomQuyen.class);

		if (nhomQuyenDTO.getChucNangs() != null && !nhomQuyenDTO.getChucNangs().isEmpty()) {
			List<ChucNang> chucNangs = nhomQuyenDTO.getChucNangs().stream()
					.map(c -> chucNangRepo.findById(c.getId())
							.orElseThrow(() -> new RuntimeException("Chức Năng không tồn tại: ID " + c.getId())))
					.collect(Collectors.toList());
			nhomQuyen.setChucNangs(chucNangs);
		}

		NhomQuyen savedNhomQuyen = nhomQuyenRepo.save(nhomQuyen);
		return ResponseDTO.<NhomQuyen>builder().status(201).msg("Tạo nhóm quyền thành công").data(savedNhomQuyen)
				.build();
	}

	@Override
	@Transactional
	public ResponseDTO<NhomQuyen> update(NhomQuyenDTO nhomQuyenDTO) {
		Optional<NhomQuyen> existingNhomQuyen = nhomQuyenRepo.findById(nhomQuyenDTO.getId());
		if (existingNhomQuyen.isPresent()) {
			NhomQuyen nhomQuyen = modelMapper.map(nhomQuyenDTO, NhomQuyen.class);
			if (!nhomQuyenDTO.getChucNangs().isEmpty()) {
				List<ChucNang> chucNangs = nhomQuyenDTO.getChucNangs().stream()
						.map(c -> chucNangRepo.findById(c.getId())
								.orElseThrow(() -> new RuntimeException("Chức Năng không tồn tại: ID " + c.getId())))
						.collect(Collectors.toList());
				nhomQuyen.setChucNangs(chucNangs);
			}
			NhomQuyen updateNhomQuyen = nhomQuyenRepo.save(nhomQuyen);
			return ResponseDTO.<NhomQuyen>builder().status(200).msg("Cập nhật nhóm quyền thành công").data(updateNhomQuyen)
					.build();
		}
		return ResponseDTO.<NhomQuyen>builder().status(409).msg("Không tìm thấy nhóm quyền").build();
	}

	@Override
	@Transactional
	public ResponseDTO<Void> delete(Integer id) {
		nhomQuyenRepo.deleteById(id);
		return ResponseDTO.<Void>builder().status(200).msg("Xóa nhóm quyền thành công").build();
	}

	@Override
	public ResponseDTO<NhomQuyen> getById(Integer id) {
		Optional<NhomQuyen> nhomQuyen = nhomQuyenRepo.findById(id);
		if (nhomQuyen.isPresent()) {
			return ResponseDTO.<NhomQuyen>builder().status(200).msg("Thành công").data(nhomQuyen.get()).build();
		}
		return ResponseDTO.<NhomQuyen>builder().status(404).msg("Không tìm thấy nhóm quyền").build();
	}

	@Override
	public ResponseDTO<PageDTO<List<NhomQuyen>>> getByTenNhomQuyen(SearchDTO searchDTO) {
		Sort sortBy = Sort.by("tenNhomQuyen").ascending();

		if (StringUtils.hasText(searchDTO.getSortedField())) {
			sortBy = Sort.by(searchDTO.getSortedField()).ascending();
		}

		if (searchDTO.getCurrentPage() == null) {
			searchDTO.setCurrentPage(0);
		}

		if (searchDTO.getSize() == null) {
			searchDTO.setSize(20);
		}

		if (searchDTO.getKeyWord() == null) {
			searchDTO.setKeyWord("");
		}
		PageRequest pageRequest = PageRequest.of(searchDTO.getCurrentPage(), searchDTO.getSize(), sortBy);
		Page<NhomQuyen> page = nhomQuyenRepo.getByTenNhomQuyen("%" + searchDTO.getKeyWord() + "%", pageRequest);

		PageDTO<List<NhomQuyen>> pageDTO = new PageDTO<>();
		pageDTO.setTotalElements(page.getTotalElements());
		pageDTO.setTotalPages(page.getTotalPages());

		List<NhomQuyen> nhomQuyens = page.getContent();

		pageDTO.setData(nhomQuyens);

		return ResponseDTO.<PageDTO<List<NhomQuyen>>>builder().status(200).msg("Thanh công").data(pageDTO).build();
	}
}
