package com.example.hieuthuoc.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.example.hieuthuoc.dto.PageDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.dto.SearchDTO;
import com.example.hieuthuoc.dto.ThongBaoDTO;
import com.example.hieuthuoc.entity.NguoiDung;
import com.example.hieuthuoc.entity.ThongBao;
import com.example.hieuthuoc.entity.ThongBao.LoaiThongBao;
import com.example.hieuthuoc.repository.NguoiDungRepo;
import com.example.hieuthuoc.repository.ThongBaoRepo;

public interface ThongBaoService {
	ResponseDTO<PageDTO<List<ThongBao>>> getByNguoiDungId(SearchDTO searchDTO);
	
	ResponseDTO<PageDTO<List<ThongBao>>> getByLoaiThongBao(SearchDTO searchDTO);

	ResponseDTO<ThongBao> getById(Integer id);

	ResponseDTO<ThongBao> create(ThongBaoDTO thuocDTO);

	ResponseDTO<ThongBao> update(ThongBaoDTO thuocDTO);

	ResponseDTO<Void> delete(Integer id);
}

@Service
class ThongBaoServiceImpl implements ThongBaoService {

	@Autowired
	ThongBaoRepo thongBaoRepo;

	@Autowired
	NguoiDungRepo nguoiDungRepo;

	ModelMapper modelMapper = new ModelMapper();

	@Override
	public ResponseDTO<PageDTO<List<ThongBao>>> getByNguoiDungId(SearchDTO searchDTO) {
		Sort sortBy = Sort.by("createdAt").descending();

		if (StringUtils.hasText(searchDTO.getSortedField())) {
			sortBy = Sort.by(searchDTO.getSortedField()).ascending();
		}

		if (searchDTO.getCurrentPage() == null) {
			searchDTO.setCurrentPage(0);
		}

		if (searchDTO.getSize() == null) {
			searchDTO.setSize(10);
		}

		if (searchDTO.getKeyWord() == null) {
			searchDTO.setKeyWord("");
		}

		PageRequest pageRequest = PageRequest.of(searchDTO.getCurrentPage(), searchDTO.getSize(), sortBy);
		Page<ThongBao> page = thongBaoRepo.findByNguoiDungId(searchDTO.getId(), pageRequest);

		PageDTO<List<ThongBao>> pageDTO = new PageDTO<>();
		pageDTO.setTotalElements(page.getTotalElements());
		pageDTO.setTotalPages(page.getTotalPages());

		List<ThongBao> thongBaos = page.getContent();
		pageDTO.setData(thongBaos);

		return ResponseDTO.<PageDTO<List<ThongBao>>>builder().status(200).msg("Thanh công").data(pageDTO).build();
	}
	
	@Override
	public ResponseDTO<PageDTO<List<ThongBao>>> getByLoaiThongBao(SearchDTO searchDTO) {
		Sort sortBy = Sort.by("id").ascending();

		if (StringUtils.hasText(searchDTO.getSortedField())) {
			sortBy = Sort.by(searchDTO.getSortedField()).ascending();
		}

		if (searchDTO.getCurrentPage() == null) {
			searchDTO.setCurrentPage(0);
		}

		if (searchDTO.getSize() == null) {
			searchDTO.setSize(10);
		}

		PageRequest pageRequest = PageRequest.of(searchDTO.getCurrentPage(), searchDTO.getSize(), sortBy);
		Page<ThongBao> page;
		
		if (searchDTO.getKeyWord() == null || searchDTO.getKeyWord().equals("")) {
			page = thongBaoRepo.findAll(pageRequest);
		}else {
			LoaiThongBao loaiThongBao = LoaiThongBao.valueOf(searchDTO.getKeyWord());
			page = thongBaoRepo.findByLoaiThongBao(loaiThongBao, pageRequest);
		}


		PageDTO<List<ThongBao>> pageDTO = new PageDTO<>();
		pageDTO.setTotalElements(page.getTotalElements());
		pageDTO.setTotalPages(page.getTotalPages());

		List<ThongBao> thongBaos = page.getContent();
		pageDTO.setData(thongBaos);

		return ResponseDTO.<PageDTO<List<ThongBao>>>builder().status(200).msg("Thanh công").data(pageDTO).build();
	}

	@Override
	public ResponseDTO<ThongBao> getById(Integer id) {
		Optional<ThongBao> thongBao = thongBaoRepo.findById(id);
		if (thongBao.isPresent()) {
			thongBao.get().setTrangThai(true);
			thongBaoRepo.save(thongBao.get());
			return ResponseDTO.<ThongBao>builder().status(200).msg("Thanh công").data(thongBao.get()).build();
		}
		return ResponseDTO.<ThongBao>builder().status(409).msg("Không tìm thấy thông báo có Id = " + id).build();
	}

	@Override
	@Transactional
	public ResponseDTO<ThongBao> create(ThongBaoDTO thongBaoDTO) {
		ThongBao thongBao = modelMapper.map(thongBaoDTO, ThongBao.class);

		if (thongBaoDTO.getNguoiDungId() != null && thongBaoDTO.getNguoiDungId().size() > 0) {
			List<NguoiDung> nguoiDungs = new ArrayList<>();
			for (int id : thongBaoDTO.getNguoiDungId()) {
				NguoiDung nguoiDung = nguoiDungRepo.findById(id)
						.orElseThrow(() -> new RuntimeException("Người dùng có Id = " + id + " không tồn tại"));
				nguoiDungs.add(nguoiDung);
			}
			thongBao.setNguoiNhan(nguoiDungs);
		}
		thongBao.setLoaiThongBao(ThongBao.LoaiThongBao.valueOf(thongBaoDTO.getLoaiThongBao()));

		
		return ResponseDTO.<ThongBao>builder().status(200).msg("Thanh công").data(thongBaoRepo.save(thongBao)).build();
	}

	@Override
	@Transactional
	public ResponseDTO<ThongBao> update(ThongBaoDTO thongBaoDTO) {
		ThongBao thongBao = modelMapper.map(thongBaoDTO, ThongBao.class);
		ThongBao currentThongBao = thongBaoRepo.findById(thongBao.getId()).orElse(null);
		if (currentThongBao != null) {
			if (thongBaoDTO.getNguoiDungId() != null && thongBaoDTO.getNguoiDungId().size() > 0) {
				List<NguoiDung> nguoiDungs = new ArrayList<>();
				for (int id : thongBaoDTO.getNguoiDungId()) {
					NguoiDung nguoiDung = nguoiDungRepo.findById(id)
							.orElseThrow(() -> new RuntimeException("Người dùng có Id = " + id + " không tồn tại"));
					nguoiDungs.add(nguoiDung);
				}
				thongBao.setNguoiNhan(nguoiDungs);
			}
			thongBao.setLoaiThongBao(ThongBao.LoaiThongBao.valueOf(thongBaoDTO.getLoaiThongBao()));
			return ResponseDTO.<ThongBao>builder().status(200).msg("Thanh công").data(thongBaoRepo.save(thongBao)).build();
		}
		return ResponseDTO.<ThongBao>builder().status(200).msg("Không tìm thấy thông báo").build();
	}

	@Override
	@Transactional
	public ResponseDTO<Void> delete(Integer id) {
		thongBaoRepo.deleteById(id);
		return ResponseDTO.<Void>builder().status(200).msg("Thanh công").build();
	}

}