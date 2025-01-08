package com.example.hieuthuoc.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
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

import com.example.hieuthuoc.dto.ChiTietDonHangDTO;
import com.example.hieuthuoc.dto.DonHangDTO;
import com.example.hieuthuoc.dto.PageDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.dto.SearchDTO;
import com.example.hieuthuoc.entity.ChiTietDonHang;
import com.example.hieuthuoc.entity.DonHang;
import com.example.hieuthuoc.entity.DonHang.TrangThaiGiaoHang;
import com.example.hieuthuoc.entity.DonHang.TrangThaiThanhToan;
import com.example.hieuthuoc.entity.NguoiDung;
import com.example.hieuthuoc.entity.ThongBao;
import com.example.hieuthuoc.entity.ThongBao.LoaiThongBao;
import com.example.hieuthuoc.entity.Thuoc;
import com.example.hieuthuoc.entity.TonKho;
import com.example.hieuthuoc.repository.DonHangRepo;
import com.example.hieuthuoc.repository.NguoiDungRepo;
import com.example.hieuthuoc.repository.ThongBaoRepo;
import com.example.hieuthuoc.repository.ThuocRepo;
import com.example.hieuthuoc.repository.TonKhoRepo;

public interface DonHangService {
	ResponseDTO<PageDTO<List<DonHang>>> getByTrangThaiGiaoHang(SearchDTO searchDTO);

	ResponseDTO<DonHang> getById(Integer id);

	ResponseDTO<DonHang> changTrangThaiGiaoHang(DonHangDTO donHangDTO);

	ResponseDTO<DonHang> changTrangThaiThanhToan(DonHangDTO donHangDTO);

	ResponseDTO<DonHang> create(DonHangDTO donHangDTO);

	ResponseDTO<DonHang> update(DonHangDTO donHangDTO);

	ResponseDTO<Void> delete(Integer id);
}

@Service
class DonHangServiceImpl implements DonHangService {

	@Autowired
	private DonHangRepo donHangRepo;

	@Autowired
	NguoiDungRepo nguoiDungRepo;

	@Autowired
	private ThuocRepo thuocRepo;

	@Autowired
	private ThongBaoRepo thongBaoRepo;

	@Autowired
	TonKhoRepo tonKhoRepo;

	ModelMapper modelMapper = new ModelMapper();

	@Override
	public ResponseDTO<PageDTO<List<DonHang>>> getByTrangThaiGiaoHang(SearchDTO searchDTO) {
		Sort sortBy = Sort.by("id").ascending();

		if (StringUtils.hasText(searchDTO.getSortedField())) {
			sortBy = Sort.by(searchDTO.getSortedField()).ascending();
		}

		if (searchDTO.getCurrentPage() == null) {
			searchDTO.setCurrentPage(0);
		}

		if (searchDTO.getSize() == null) {
			searchDTO.setSize(20);
		}

		PageRequest pageRequest = PageRequest.of(searchDTO.getCurrentPage(), searchDTO.getSize(), sortBy);
		Page<DonHang> page;

		if (searchDTO.getKeyWord() == null || searchDTO.getKeyWord().equals("")) {
			if(searchDTO.getId() > 0) {
				page = donHangRepo.findByNguoiDungId(searchDTO.getId(), pageRequest);
			}else {
				page = donHangRepo.findAll(pageRequest);
			}
			
		} else {

			TrangThaiGiaoHang trangThaiGiaoHang = TrangThaiGiaoHang.valueOf(searchDTO.getKeyWord());

			page = donHangRepo.findByTrangThaiGiaoHang(trangThaiGiaoHang,searchDTO.getId(), pageRequest);

		}

		PageDTO<List<DonHang>> pageDTO = new PageDTO<>();
		pageDTO.setTotalElements(page.getTotalElements());
		pageDTO.setTotalPages(page.getTotalPages());

		List<DonHang> donHang = page.getContent();

		pageDTO.setData(donHang);

		return ResponseDTO.<PageDTO<List<DonHang>>>builder().status(200).msg("ok").data(pageDTO).build();
	}

	@Override
	public ResponseDTO<DonHang> getById(Integer id) {
		Optional<DonHang> donhang = donHangRepo.findById(id);
		if (donhang.isPresent()) {
			return ResponseDTO.<DonHang>builder().status(200).msg("Thành công").data(donhang.get()).build();
		}
		return ResponseDTO.<DonHang>builder().status(200).msg("Không tìm thấy đơn hàng").build();
	}

	@Override
	public ResponseDTO<DonHang> changTrangThaiGiaoHang(DonHangDTO donHangDTO) {
		DonHang donHang = donHangRepo.findById(donHangDTO.getId()).orElse(null);
		if (donHang != null) {
			donHang.setTrangThaiGiaoHang(DonHang.TrangThaiGiaoHang.valueOf(donHangDTO.getTrangThaiGiaoHang()));
			DonHang updateDonHang = donHangRepo.save(donHang);
			
			TrangThaiGiaoHang trangThai = DonHang.TrangThaiGiaoHang.valueOf(donHangDTO.getTrangThaiGiaoHang());
			System.out.println("Trạng thái giao hàng mới: " + trangThai);

			if (updateDonHang.getTrangThaiGiaoHang().equals(TrangThaiGiaoHang.DA_GIAO)
					|| updateDonHang.getTrangThaiGiaoHang().equals(TrangThaiGiaoHang.DA_HUY)) {
				if (updateDonHang.getKhachHang() != null) {
					ThongBao thongBao = new ThongBao();

					String tieuDe;
					String noidung;

					if (updateDonHang.getTrangThaiGiaoHang().equals(TrangThaiGiaoHang.DA_GIAO)) {
						tieuDe = "Đơn hàng đã giao thành công";
						noidung = "Đơn hàng ID = " + updateDonHang.getId() + " đã được giao thành công.";

						// Cập nhật số lượng thuốc trong kho
						try {
							updateSoLuongKho(updateDonHang.getChiTietDonHangs());
						} catch (Exception e) {
							System.out.println("Lỗi khi cập nhật số lượng kho: " + e.getMessage());
							e.printStackTrace();
						}

					} else {
						tieuDe = "Đơn hàng đã hủy thành công";
						noidung = "Đơn hàng ID = " + updateDonHang.getId() + " đã được hủy thành công.";
					}

					String linkLienKet = "http://localhost:4200/user/donmua-chitiet/" + updateDonHang.getId();
					LoaiThongBao loaiThongBao = LoaiThongBao.CA_NHAN;

					List<NguoiDung> nguoiDungs = new ArrayList<>();
					nguoiDungs.add(updateDonHang.getKhachHang());

					thongBao.setTieuDe(tieuDe);
					thongBao.setNoiDung(noidung);
					thongBao.setLinkLienKet(linkLienKet);
					thongBao.setLoaiThongBao(loaiThongBao);
					thongBao.setNguoiNhan(nguoiDungs);

					thongBaoRepo.save(thongBao);
				}
			}

			return ResponseDTO.<DonHang>builder().status(200).msg("Thành công").data(updateDonHang).build();
		}
		return ResponseDTO.<DonHang>builder().status(200).msg("Không tìm thấy đơn hàng").build();
	}

	@Override
	public ResponseDTO<DonHang> changTrangThaiThanhToan(DonHangDTO donHangDTO) {
		DonHang donHang = donHangRepo.findById(donHangDTO.getId()).orElse(null);
		if (donHang != null) {
			donHang.setTrangThaiThanhToan(DonHang.TrangThaiThanhToan.valueOf(donHangDTO.getTrangThaiThanhToan()));
			DonHang updateDonHang = donHangRepo.save(donHang);
			return ResponseDTO.<DonHang>builder().status(200).msg("Thành công").data(updateDonHang).build();
		}
		return ResponseDTO.<DonHang>builder().status(200).msg("Không tìm thấy đơn hàng").build();
	}

	@Override
	@Transactional
	public ResponseDTO<DonHang> create(DonHangDTO donHangDTO) {
		DonHang donHang = modelMapper.map(donHangDTO, DonHang.class);

		if (donHangDTO.getKhachHangId() != null) {
			NguoiDung khachHang = nguoiDungRepo.findById(donHangDTO.getKhachHangId()).orElse(null);
			if (khachHang != null) {
				donHang.setKhachHang(khachHang);

			}
		}

		donHang.setPhuongThucThanhToan(DonHang.PhuongThucThanhToan.valueOf(donHangDTO.getPhuongThucThanhToan()));
		
		donHang.setTrangThaiGiaoHang(donHangDTO.getTrangThaiGiaoHang() != null
				? DonHang.TrangThaiGiaoHang.valueOf(donHangDTO.getTrangThaiGiaoHang())
				: TrangThaiGiaoHang.DANG_XU_LY);

		donHang.setTrangThaiThanhToan(TrangThaiThanhToan.CHUA_THANH_TOAN);
		
		if ("CHUYEN_KHOAN".equalsIgnoreCase(donHangDTO.getPhuongThucThanhToan())) {
			donHang.setTrangThaiThanhToan(TrangThaiThanhToan.DA_THANH_TOAN);
		}
		

		if (donHangDTO.getNguoiDungId() != null) {
			NguoiDung nguoiDung = nguoiDungRepo.findById(donHangDTO.getNguoiDungId()).orElse(null);
			if (nguoiDung != null) {
				donHang.setNguoiDung(nguoiDung);
			}

			if ("CHUYEN_KHOAN".equalsIgnoreCase(donHangDTO.getPhuongThucThanhToan())) {
				donHang.setTrangThaiThanhToan(TrangThaiThanhToan.CHUA_THANH_TOAN);
				donHang.setTrangThaiGiaoHang(TrangThaiGiaoHang.DA_GIAO);
			} else if ("TIEN_MAT".equalsIgnoreCase(donHangDTO.getPhuongThucThanhToan())) {
				donHang.setTrangThaiThanhToan(TrangThaiThanhToan.DA_THANH_TOAN);
				donHang.setTrangThaiGiaoHang(TrangThaiGiaoHang.DA_GIAO);
			} else {
				throw new IllegalArgumentException("Phương thức thanh toán không hợp lệ");
			}

		}
		if (donHangDTO.getKhachHangId() == null && donHangDTO.getNguoiDungId() == null) {
			return ResponseDTO.<DonHang>builder().status(409).msg("Không có người tạo đơn").build();
		}

		Double tongTien = 0.0;
		List<ChiTietDonHang> chiTietDonHangs = new ArrayList<>();
		for (ChiTietDonHangDTO chiTietDonHangDTO : donHangDTO.getChiTietDonHangs()) {

			ChiTietDonHang chiTietDonHang = modelMapper.map(chiTietDonHangDTO, ChiTietDonHang.class);

			Thuoc thuoc = thuocRepo.findById(chiTietDonHangDTO.getThuocId())
					.orElseThrow(() -> new RuntimeException("Thuốc không tồn tại"));

			tongTien += chiTietDonHang.getDonGia() * chiTietDonHang.getSoLuong();

			chiTietDonHang.setThuoc(thuoc);
			chiTietDonHang.setDonHang(donHang);
			chiTietDonHangs.add(chiTietDonHang);

		}



		donHang.setTongTien(tongTien);
		donHang.setChiTietDonHangs(chiTietDonHangs);

		DonHang createDonHang = donHangRepo.save(donHang);

		if (createDonHang.getKhachHang() != null) {
			ThongBao thongBao = new ThongBao();
			String tieuDe = "Đặt đơn hàng thành công";
			String noidung = "Đơn hàng ID = " + createDonHang.getId() + " đã được đặt thành công.";
			String linkLienKet = "http://localhost:4200/user/donmua-chitiet/" + createDonHang.getId();
			LoaiThongBao loaiThongBao = LoaiThongBao.CA_NHAN;

			List<NguoiDung> nguoiDungs = new ArrayList<>();
			nguoiDungs.add(createDonHang.getKhachHang());

			thongBao.setTieuDe(tieuDe);
			thongBao.setNoiDung(noidung);
			thongBao.setLinkLienKet(linkLienKet);
			thongBao.setLoaiThongBao(loaiThongBao);
			thongBao.setNguoiNhan(nguoiDungs);

			thongBaoRepo.save(thongBao);
		}

		return ResponseDTO.<DonHang>builder().status(200).msg("ok").data(createDonHang).build();
	}

	@Override
	@Transactional
	public ResponseDTO<DonHang> update(DonHangDTO donHangDTO) {
		DonHang donHang = modelMapper.map(donHangDTO, DonHang.class);
		DonHang currentDonHang = donHangRepo.findById(donHang.getId()).orElse(null);
		if (currentDonHang != null) {

			if (donHangDTO.getKhachHangId() != null) {
				NguoiDung khachHang = nguoiDungRepo.findById(donHangDTO.getKhachHangId()).orElse(null);
				if (khachHang != null) {
					donHang.setKhachHang(khachHang);
				}
			}

			if (donHangDTO.getNguoiDungId() != null) {
				NguoiDung nguoiDung = nguoiDungRepo.findById(donHangDTO.getNguoiDungId()).orElse(null);
				if (nguoiDung != null) {
					donHang.setKhachHang(nguoiDung);
				}
			}
			if (donHangDTO.getKhachHangId() == null && donHangDTO.getNguoiDungId() == null) {
				return ResponseDTO.<DonHang>builder().status(409).msg("Không có người tạo đơn").build();
			}

			Double tongTien = 0.0;
			List<ChiTietDonHang> chiTietDonHangs = new ArrayList<>();
			for (ChiTietDonHangDTO chiTietDonHangDTO : donHangDTO.getChiTietDonHangs()) {

				ChiTietDonHang chiTietDonHang = modelMapper.map(chiTietDonHangDTO, ChiTietDonHang.class);

				Thuoc thuoc = thuocRepo.findById(chiTietDonHangDTO.getThuocId())
						.orElseThrow(() -> new RuntimeException("Thuốc không tồn tại"));

				tongTien += chiTietDonHang.getDonGia() * chiTietDonHang.getSoLuong();

				chiTietDonHang.setThuoc(thuoc);
				chiTietDonHang.setDonHang(donHang);
				chiTietDonHangs.add(chiTietDonHang);

			}

			donHang.setTongTien(tongTien);
			donHang.setChiTietDonHangs(chiTietDonHangs);

			return ResponseDTO.<DonHang>builder().status(200).msg("Thành công").data(donHangRepo.save(donHang)).build();
		}
		return ResponseDTO.<DonHang>builder().status(409).msg("Đơn hàng không tồn tài").build();
	}

	@Override
	@Transactional
	public ResponseDTO<Void> delete(Integer id) {
		donHangRepo.deleteById(id);
		return ResponseDTO.<Void>builder().status(200).msg("Thành công.").build();
	}

	public void updateSoLuongKho(List<ChiTietDonHang> chiTietDonHangs) {
		for (ChiTietDonHang chiTietDonHang : chiTietDonHangs) {

			Calendar calendar = Calendar.getInstance();
			calendar.add(Calendar.MONTH, 3);
			Date ngayCanSoSanh = calendar.getTime();

			TonKho tonKho = tonKhoRepo.findNearestTonKhoByThuocIdAndHanSuDungBefore(chiTietDonHang.getThuoc().getId(),
					ngayCanSoSanh);

			int soLuong = tonKho.getSoLuong() - chiTietDonHang.getSoLuong();
			tonKho.setSoLuong(soLuong);

			tonKhoRepo.save(tonKho);

		}
	}

}
