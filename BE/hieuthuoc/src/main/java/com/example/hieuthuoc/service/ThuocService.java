package com.example.hieuthuoc.service;

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
import com.example.hieuthuoc.dto.SearchThuocDTO;
import com.example.hieuthuoc.dto.ThuocDTO;
import com.example.hieuthuoc.entity.Thuoc;
import com.example.hieuthuoc.repository.DanhMucThuocRepo;
import com.example.hieuthuoc.repository.LoaiThuocRepo;
import com.example.hieuthuoc.repository.NhaSanXuatRepo;
import com.example.hieuthuoc.repository.ThuocRepo;

public interface ThuocService {
	ResponseDTO<Thuoc> create(ThuocDTO thuocDTO);

	ResponseDTO<Thuoc> update(ThuocDTO thuocDTO);

	ResponseDTO<Void> delete(Integer id);

	ResponseDTO<Thuoc> getById(Integer id);

	ResponseDTO<PageDTO<List<Thuoc>>> search(SearchThuocDTO searchThuocDTO);

}

@Service
class ThuocServiceImpl implements ThuocService {

	@Autowired
	private ThuocRepo thuocRepo;

	@Autowired
	LoaiThuocRepo loaiThuocRepo;

	@Autowired
	NhaSanXuatRepo nhaSanXuatRepo;

	@Autowired
	DanhMucThuocRepo danhMucThuocRepo;

	@Autowired
	UploadImageService uploadImageService;

	ModelMapper modelMapper = new ModelMapper();

	@Override
	public ResponseDTO<PageDTO<List<Thuoc>>> search(SearchThuocDTO searchThuocDTO) {
		Sort sortBy = Sort.by("tenThuoc").ascending();

		if (StringUtils.hasText(searchThuocDTO.getSortedField())) {
			sortBy = Sort.by(searchThuocDTO.getSortedField()).ascending();
		}

		if (searchThuocDTO.getCurrentPage() == null) {
			searchThuocDTO.setCurrentPage(0);
		}

		if (searchThuocDTO.getSize() == null) {
			searchThuocDTO.setSize(20);
		}

		if (searchThuocDTO.getKeyWord() == null) {
			searchThuocDTO.setKeyWord("");
		}
		PageRequest pageRequest = PageRequest.of(searchThuocDTO.getCurrentPage(), searchThuocDTO.getSize(), sortBy);
		Page<Thuoc> page = thuocRepo.search(searchThuocDTO.getKeyWord(), searchThuocDTO.getLoaiThuoc(),
				searchThuocDTO.getNhaSanXuat(), searchThuocDTO.getDanhMucThuoc(), searchThuocDTO.getDoiTuongSd(),
				searchThuocDTO.getMaxGiaBan(), pageRequest);

		PageDTO<List<Thuoc>> pageDTO = new PageDTO<>();
		pageDTO.setTotalElements(page.getTotalElements());
		pageDTO.setTotalPages(page.getTotalPages());

		List<Thuoc> thuocDTOs = page.getContent();

		pageDTO.setData(thuocDTOs);

		return ResponseDTO.<PageDTO<List<Thuoc>>>builder().status(200).msg("Thanh công").data(pageDTO).build();
	}

	@Override
	public ResponseDTO<Thuoc> getById(Integer id) {
		Optional<Thuoc> thuoc = thuocRepo.findById(id);
		if (thuoc.isPresent()) {
			return ResponseDTO.<Thuoc>builder().status(200).msg("Thành công").data(thuoc.get()).build();
		}
		return ResponseDTO.<Thuoc>builder().status(409).msg("Không tìm thấy thuốc").build();
	}

	@Override
	@Transactional
	public ResponseDTO<Thuoc> create(ThuocDTO thuocDTO) {
		Thuoc thuoc = modelMapper.map(thuocDTO, Thuoc.class);

		if (thuocRepo.existsByMaThuoc(thuoc.getMaThuoc())) {
			return ResponseDTO.<Thuoc>builder().status(409).msg("Mã thuốc đã tồn tại").build();
		}

		if (thuocRepo.existsByTenThuoc(thuoc.getTenThuoc())) {
			return ResponseDTO.<Thuoc>builder().status(409).msg("Tên thuốc đã tồn tại").build();
		}

		thuoc.setLoaiThuoc(loaiThuocRepo.findById(thuocDTO.getLoaiThuocId()).get());
		thuoc.setNhaSanXuat(nhaSanXuatRepo.findById(thuocDTO.getNhaSanXuatId()).get());
		thuoc.setDanhMucThuoc(danhMucThuocRepo.findById(thuocDTO.getDanhMucThuocId()).get());

		if (thuocDTO.getFile() == null || thuocDTO.getFile().isEmpty()) {
			System.out.println("File không tồn tại hoặc rỗng.");

		}else {
			System.out.println("có file");
		}

		// set Avatar
		String name = "Thuoc_" + thuocDTO.getId();
		String url = uploadImageService.uploadImage(thuocDTO.getFile(), name);
		thuoc.setAvatar(url);
		System.out.println("URL : " + url);

		return ResponseDTO.<Thuoc>builder().status(200).msg("Thành công").data(thuocRepo.save(thuoc)).build();
	}

	@Override
	@Transactional
	public ResponseDTO<Thuoc> update(ThuocDTO thuocDTO) {
		Thuoc thuoc = modelMapper.map(thuocDTO, Thuoc.class);
		Thuoc curentThuoc = thuocRepo.findById(thuoc.getId()).orElse(null);
		if (curentThuoc != null) {

			thuoc.setLoaiThuoc(loaiThuocRepo.findById(thuocDTO.getLoaiThuocId()).get());
			thuoc.setDanhMucThuoc(danhMucThuocRepo.findById(thuocDTO.getDanhMucThuocId()).get());
			thuoc.setNhaSanXuat(nhaSanXuatRepo.findById(thuocDTO.getNhaSanXuatId()).get());

			// lưu ảnh
			if (thuocDTO.getFile() != null) {
				if (thuoc.getAvatar().length() > 0) {
					uploadImageService.deleteImage(thuoc.getAvatar());
				}
				String name = "Thuoc_" + thuocDTO.getId();
				String url = uploadImageService.uploadImage(thuocDTO.getFile(), name);
				thuoc.setAvatar(url);
			}

			return ResponseDTO.<Thuoc>builder().status(200).msg("Thành công").data(thuocRepo.save(thuoc)).build();
		}
		return ResponseDTO.<Thuoc>builder().status(409).msg("Không tìm thấy thuốc").build();
	}

	@Override
	@Transactional
	public ResponseDTO<Void> delete(Integer id) {
		thuocRepo.deleteById(id);
		return ResponseDTO.<Void>builder().status(200).msg("Thành công").build();
	}
}