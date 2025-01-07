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

import com.example.hieuthuoc.dto.PageDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.dto.SearchDTO;
import com.example.hieuthuoc.dto.SearchThuocDTO;
import com.example.hieuthuoc.dto.ThuocDTO;
import com.example.hieuthuoc.entity.DoiTuong;
import com.example.hieuthuoc.entity.LoaiThuoc;
import com.example.hieuthuoc.entity.NhaSanXuat;
import com.example.hieuthuoc.entity.ThanhPhanThuoc;
import com.example.hieuthuoc.entity.Thuoc;
import com.example.hieuthuoc.repository.ChiTietDonHangRepo;
import com.example.hieuthuoc.repository.DoiTuongRepo;
import com.example.hieuthuoc.repository.DoiTuongSdThuocRepo;
import com.example.hieuthuoc.repository.LoaiThuocRepo;
import com.example.hieuthuoc.repository.NhaSanXuatRepo;
import com.example.hieuthuoc.repository.ThanhPhanThuocRepo;
import com.example.hieuthuoc.repository.ThuocRepo;

public interface ThuocService {
	ResponseDTO<Thuoc> create(ThuocDTO thuocDTO);

	ResponseDTO<Thuoc> update(ThuocDTO thuocDTO);

	ResponseDTO<Void> delete(Integer id);

	ResponseDTO<Thuoc> getById(Integer id);

	ResponseDTO<PageDTO<List<Thuoc>>> search(SearchThuocDTO searchThuocDTO);

	ResponseDTO<PageDTO<List<Thuoc>>> getThuocBanChay(SearchDTO searchDTO);

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
	DoiTuongRepo doiTuongRepo;

	@Autowired
	DoiTuongSdThuocRepo doiTuongSdThuocRepo;

	@Autowired
	ThanhPhanThuocRepo thanhPhanThuocRepo;

	@Autowired
	ChiTietDonHangRepo chiTietDonHangRepo;

	@Autowired
	UploadImageService uploadImageService;

	ModelMapper modelMapper = new ModelMapper();

	@Override
	public ResponseDTO<PageDTO<List<Thuoc>>> getThuocBanChay(SearchDTO searchDTO) {
		Sort sortBy = Sort.by("tenThuoc").ascending();

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
		Page<Thuoc> page = chiTietDonHangRepo.findAllThuocBanChay(pageRequest);

		PageDTO<List<Thuoc>> pageDTO = new PageDTO<>();
		pageDTO.setTotalElements(page.getTotalElements());
		pageDTO.setTotalPages(page.getTotalPages());

		List<Thuoc> thuocDTOs = page.getContent();

		pageDTO.setData(thuocDTOs);

		return ResponseDTO.<PageDTO<List<Thuoc>>>builder().status(200).msg("Thanh công").data(pageDTO).build();
	}

	@Override
	public ResponseDTO<PageDTO<List<Thuoc>>> search(SearchThuocDTO searchThuocDTO) {
		
		System.out.println(searchThuocDTO);
		
		Sort sortBy = Sort.by("id").ascending();

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
				searchThuocDTO.getNhaSanXuat(), searchThuocDTO.getDanhMucThuoc(), searchThuocDTO.getMinGiaBan(),
				searchThuocDTO.getMaxGiaBan(), searchThuocDTO.getTenDoiTuong(), searchThuocDTO.getTrangThai(),
				pageRequest);

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

		// Lấy các thực thể liên quan từ cơ sở dữ liệu
		LoaiThuoc loaiThuoc = loaiThuocRepo.findById(thuocDTO.getLoaiThuocId())
				.orElseThrow(() -> new RuntimeException("Loại thuốc không tồn tại"));
		NhaSanXuat nhaSanXuat = nhaSanXuatRepo.findById(thuocDTO.getNhaSanXuatId())
				.orElseThrow(() -> new RuntimeException("Nhà sản xuất không tồn tại"));

		thuoc.setLoaiThuoc(loaiThuoc);
		thuoc.setNhaSanXuat(nhaSanXuat);

		// lưu ảnh vài cloudinary
//		if (thuocDTO.getFile() != null && Base64ToMultipartFileConverter.isBase64(thuocDTO.getFile())) {
//			MultipartFile avatarFile = Base64ToMultipartFileConverter.convert(thuocDTO.getFile());
//			String name = "Thuoc_" + thuocDTO.getId();
//			String avatarUrl = uploadImageService.uploadImage(avatarFile, name);
//			thuoc.setAvatar(avatarUrl);
//		}

		if (thuocDTO.getFile() != null && !thuocDTO.getFile().isEmpty()) {
			String name = "Thuoc_" + thuocDTO.getId();
			String avatarUrl = uploadImageService.uploadImage(thuocDTO.getFile(), name);
			thuoc.setAvatar(avatarUrl);
		}

		if (!thuocDTO.getThanhPhanThuocs().isEmpty()) {
			List<ThanhPhanThuoc> thanhPhanThuocs = thuocDTO.getThanhPhanThuocs().stream().map(t -> {
				ThanhPhanThuoc thanhPhanThuoc = modelMapper.map(t, ThanhPhanThuoc.class);
				thanhPhanThuoc.setThuoc(thuoc);
				return thanhPhanThuoc;
			}).collect(Collectors.toList());
			thuoc.setThanhPhanThuocs(thanhPhanThuocs);
		}

		// Xử lý danh sách DoiTuong
		if (!thuocDTO.getDoiTuongs().isEmpty()) {
			List<DoiTuong> doiTuongs = thuocDTO.getDoiTuongs().stream()
					.map(d -> doiTuongRepo.findById(d.getId())
							.orElseThrow(() -> new RuntimeException("Đối tượng không tồn tại: ID " + d.getId())))
					.collect(Collectors.toList());
			thuoc.setDoiTuongs(doiTuongs);
		}

		return ResponseDTO.<Thuoc>builder().status(200).msg("Thành công").data(thuocRepo.save(thuoc)).build();
	}

	@Override
	@Transactional
	public ResponseDTO<Thuoc> update(ThuocDTO thuocDTO) {
		Thuoc thuoc = modelMapper.map(thuocDTO, Thuoc.class);
		Thuoc curentThuoc = thuocRepo.findById(thuoc.getId()).orElse(null);
		if (curentThuoc != null) {

			if (thuocDTO.getMaThuoc().equals(curentThuoc.getMaThuoc()) == false
					&& thuocRepo.existsByMaThuoc(thuoc.getMaThuoc())) {
				return ResponseDTO.<Thuoc>builder().status(409).msg("Mã thuốc đã tồn tại").build();
			}

			if (thuocDTO.getTenThuoc().equals(curentThuoc.getTenThuoc()) == false
					&& thuocRepo.existsByTenThuoc(thuoc.getTenThuoc())) {
				return ResponseDTO.<Thuoc>builder().status(409).msg("Tên thuốc đã tồn tại").build();
			}

			// Lấy các thực thể liên quan từ cơ sở dữ liệu
			LoaiThuoc loaiThuoc = loaiThuocRepo.findById(thuocDTO.getLoaiThuocId())
					.orElseThrow(() -> new RuntimeException("Loại thuốc không tồn tại"));
			NhaSanXuat nhaSanXuat = nhaSanXuatRepo.findById(thuocDTO.getNhaSanXuatId())
					.orElseThrow(() -> new RuntimeException("Nhà sản xuất không tồn tại"));

			thuoc.setLoaiThuoc(loaiThuoc);
			thuoc.setNhaSanXuat(nhaSanXuat);

			// Xoá đi ảnh trước đó trong cloudinary
//			if (thuocDTO.getFile().length() > 0) {
//				uploadImageService.deleteImage(thuoc.getAvatar());
//			}
//
//			if (Base64ToMultipartFileConverter.isBase64(thuocDTO.getFile())) {
//				MultipartFile avatarFile = Base64ToMultipartFileConverter.convert(thuocDTO.getFile());
//				String name = "Thuoc_" + thuocDTO.getId();
//				String avatarUrl = uploadImageService.uploadImage(avatarFile, name);
//				thuoc.setAvatar(avatarUrl);
//			}

			if (thuocDTO.getFile() != null && !thuocDTO.getFile().isEmpty()) {
				// Xoá đi ảnh trước đó trong cloudinary
				if (thuoc.getAvatar() != null) {
					uploadImageService.deleteImage(thuoc.getAvatar());
				}

				String name = "Thuoc_" + thuocDTO.getId();
				String avatarUrl = uploadImageService.uploadImage(thuocDTO.getFile(), name);
				thuoc.setAvatar(avatarUrl);
			}

			// Xử lý danh sách Thanh Phần Thuốc
			if (thuocDTO.getThanhPhanThuocs() != null && !thuocDTO.getThanhPhanThuocs().isEmpty()) {
				List<ThanhPhanThuoc> thanhPhanThuocs = thuocDTO.getThanhPhanThuocs().stream().map(t -> {
					ThanhPhanThuoc thanhPhanThuoc = modelMapper.map(t, ThanhPhanThuoc.class);
					thanhPhanThuoc.setThuoc(thuoc);
					return thanhPhanThuoc;
				}).collect(Collectors.toList());
				thuoc.setThanhPhanThuocs(thanhPhanThuocs);
			}

			// Xử lý danh sách DoiTuong
			if (thuocDTO.getDoiTuongs() != null && !thuocDTO.getDoiTuongs().isEmpty()) {
				List<DoiTuong> doiTuongs = thuocDTO.getDoiTuongs().stream()
						.map(d -> doiTuongRepo.findById(d.getId())
								.orElseThrow(() -> new RuntimeException("Đối tượng không tồn tại: ID " + d.getId())))
						.collect(Collectors.toList());
				thuoc.setDoiTuongs(doiTuongs);
			}

			return ResponseDTO.<Thuoc>builder().status(200).msg("Thành công").data(thuocRepo.save(thuoc)).build();
		}
		return ResponseDTO.<Thuoc>builder().status(404).msg("Không tìm thấy thuốc").build();
	}

	@Override
	@Transactional
	public ResponseDTO<Void> delete(Integer id) {
		thuocRepo.deleteById(id);
		return ResponseDTO.<Void>builder().status(200).msg("Thành công").build();
	}
}