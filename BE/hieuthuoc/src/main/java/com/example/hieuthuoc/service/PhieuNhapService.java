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

import com.example.hieuthuoc.dto.ChiTietPhieuNhapDTO;
import com.example.hieuthuoc.dto.PageDTO;
import com.example.hieuthuoc.dto.PhieuNhapDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.dto.SearchDTO;
import com.example.hieuthuoc.entity.ChiTietPhieuNhap;
import com.example.hieuthuoc.entity.NguoiDung;
import com.example.hieuthuoc.entity.NhaCungCap;
import com.example.hieuthuoc.entity.PhieuNhap;
import com.example.hieuthuoc.entity.Thuoc;
import com.example.hieuthuoc.repository.NguoiDungRepo;
import com.example.hieuthuoc.repository.NhaCungCapRepo;
import com.example.hieuthuoc.repository.PhieuNhapRepo;
import com.example.hieuthuoc.repository.ThuocRepo;

public interface PhieuNhapService {
	ResponseDTO<PageDTO<List<PhieuNhap>>> getAll(SearchDTO searchDTO);

	ResponseDTO<PhieuNhap> getById(Integer id);

	ResponseDTO<PhieuNhap> create(PhieuNhapDTO phieuNhapDTO);

	ResponseDTO<PhieuNhap> update(PhieuNhapDTO phieuNhapDTO);

	ResponseDTO<Void> delete(Integer id);
}

@Service
class PhieuNhapServiceImpl implements PhieuNhapService {

	@Autowired
	private PhieuNhapRepo phieuNhapRepo;

	@Autowired
	private NhaCungCapRepo nhaCungCapRepo;
	
	@Autowired
	private NguoiDungRepo nguoiDungRepo;
	
	@Autowired
	private ThuocRepo thuocRepo;
	
	ModelMapper modelMapper = new ModelMapper();

	@Override
	public ResponseDTO<PageDTO<List<PhieuNhap>>> getAll(SearchDTO searchDTO) {
		Sort sortBy = Sort.by("createdAt").ascending();

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
		Page<PhieuNhap> page = phieuNhapRepo.findAll(pageRequest);

		PageDTO<List<PhieuNhap>> pageDTO = new PageDTO<>();
		pageDTO.setTotalElements(page.getTotalElements());
		pageDTO.setTotalPages(page.getTotalPages());

		List<PhieuNhap> phieuNhaps = page.getContent();

		pageDTO.setData(phieuNhaps);

		return ResponseDTO.<PageDTO<List<PhieuNhap>>>builder().status(200).msg("Thanh công").data(pageDTO).build();
	}

	@Override
	public ResponseDTO<PhieuNhap> getById(Integer id) {
		Optional<PhieuNhap> phieuNhap = phieuNhapRepo.findById(id);
		if (phieuNhap.isPresent()) {
			return ResponseDTO.<PhieuNhap>builder().status(200).msg("Thành công").data(phieuNhap.get()).build();
		}
		return ResponseDTO.<PhieuNhap>builder().status(409).msg("Không tìm thấy phiếu nhập").build();
	}

	@Override
	@Transactional
	public ResponseDTO<PhieuNhap> create(PhieuNhapDTO phieuNhapDTO) {
		PhieuNhap phieuNhap = modelMapper.map(phieuNhapDTO, PhieuNhap.class);
		
		if (phieuNhapDTO.getNguoiDungId() != null) {
			NguoiDung nguoiDung = nguoiDungRepo.findById(phieuNhapDTO.getNguoiDungId()).orElse(null);
			if (nguoiDung != null) {
				phieuNhap.setNguoiDung(nguoiDung);
			}
		}

		if (phieuNhapDTO.getNhaCungCapId() != null) {
			NhaCungCap nhaCungCap = nhaCungCapRepo.findById(phieuNhapDTO.getNhaCungCapId() ).orElse(null);
			if (nhaCungCap != null) {
				phieuNhap.setNhaCungCap(nhaCungCap);
			}
		}

		Double tongTien = 0.0;
		List<ChiTietPhieuNhap> chiTietPhieuNhaps = new ArrayList<>();
		for (ChiTietPhieuNhapDTO chiTietPhieuNhapDTO : phieuNhapDTO.getChiTietPhieuNhaps()) {

			ChiTietPhieuNhap chiTietPhieuNhap = modelMapper.map(chiTietPhieuNhapDTO, ChiTietPhieuNhap.class);

			Thuoc thuoc = thuocRepo.findById(chiTietPhieuNhapDTO.getThuocId())
					.orElseThrow(() -> new RuntimeException("Thuốc không tồn tại"));

			tongTien += chiTietPhieuNhap.getDonGia() * chiTietPhieuNhap.getSoLuong();

			chiTietPhieuNhap.setThuoc(thuoc);
			chiTietPhieuNhap.setPhieuNhap(phieuNhap);
			chiTietPhieuNhaps.add(chiTietPhieuNhap);

		}
		phieuNhap.setTongTien(tongTien);
		phieuNhap.setChiTietPhieuNhaps(chiTietPhieuNhaps);
		return ResponseDTO.<PhieuNhap>builder().status(200).msg("ok").data(phieuNhapRepo.save(phieuNhap)).build();
	}

	@Override
	@Transactional
	public ResponseDTO<PhieuNhap> update(PhieuNhapDTO phieuNhapDTO) {
		PhieuNhap phieuNhap = modelMapper.map(phieuNhapDTO, PhieuNhap.class);
		PhieuNhap currentPhieuNhap = phieuNhapRepo.findById(phieuNhap.getId()).orElse(null);
		if (currentPhieuNhap != null) {
			Double tongTien = 0.0;
			List<ChiTietPhieuNhap> chiTietPhieuNhaps = new ArrayList<>();
			for (ChiTietPhieuNhapDTO chiTietPhieuNhapDTO : phieuNhapDTO.getChiTietPhieuNhaps()) {

				ChiTietPhieuNhap chiTietPhieuNhap = modelMapper.map(chiTietPhieuNhapDTO, ChiTietPhieuNhap.class);

				Thuoc thuoc = thuocRepo.findById(chiTietPhieuNhapDTO.getThuocId())
						.orElseThrow(() -> new RuntimeException("Thuốc có Id = " + chiTietPhieuNhapDTO.getThuocId() + " không tồn tại"));

				tongTien += chiTietPhieuNhap.getDonGia() * chiTietPhieuNhap.getSoLuong();

				chiTietPhieuNhap.setThuoc(thuoc);
				chiTietPhieuNhap.setPhieuNhap(phieuNhap);
				chiTietPhieuNhaps.add(chiTietPhieuNhap);

			}
			phieuNhap.setTongTien(tongTien);
			phieuNhap.setChiTietPhieuNhaps(chiTietPhieuNhaps);
			
			return ResponseDTO.<PhieuNhap>builder().status(200).msg("Thành công").data(phieuNhapRepo.save(phieuNhap)).build();
		}
		return ResponseDTO.<PhieuNhap>builder().status(200).msg("Không tìm thấy phiếu nhập").build();
	}

	@Override
	@Transactional
	public ResponseDTO<Void> delete(Integer id) {
		phieuNhapRepo.deleteById(id);
		return ResponseDTO.<Void>builder().status(200).msg("Thành công").build();
	}
}
