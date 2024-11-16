package com.example.hieuthuoc.service;

import com.example.hieuthuoc.dto.NhomQuyenDTO;
import com.example.hieuthuoc.entity.NhomQuyen;
import com.example.hieuthuoc.repository.NhomQuyenRepo;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

public interface NhomQuyenService {
	List<NhomQuyenDTO> getAll();

	Optional<NhomQuyenDTO> getById(Integer id);

	NhomQuyen create(NhomQuyenDTO nhomQuyenDTO);

	NhomQuyen update(NhomQuyenDTO nhomQuyenDTO);

	void delete(Integer id);
}

@Service
class NhomQuyenServiceImpl implements NhomQuyenService {

	@Autowired
	private NhomQuyenRepo nhomQuyenRepo;

	ModelMapper modelMapper = new ModelMapper();

	@Override
	public List<NhomQuyenDTO> getAll() {
		List<NhomQuyen> nhomQuyenList = nhomQuyenRepo.findAll();
		return nhomQuyenList.stream().map(nhomQuyen -> modelMapper.map(nhomQuyen, NhomQuyenDTO.class)).collect(Collectors.toList());
	}

	@Override
	public Optional<NhomQuyenDTO> getById(Integer id) {
		Optional<NhomQuyen> nhomQuyen = nhomQuyenRepo.findById(id);
		if (nhomQuyen.isPresent()) {
			NhomQuyenDTO nhomQuyenDTO = modelMapper.map(nhomQuyen.get(), NhomQuyenDTO.class);
			return Optional.of(nhomQuyenDTO);
		}
		return null;
	}

	@Override
	@Transactional
	public NhomQuyen create(NhomQuyenDTO nhomQuyenDTO) {
		NhomQuyen nhomQuyen = modelMapper.map(nhomQuyenDTO, NhomQuyen.class);
		return nhomQuyenRepo.save(nhomQuyen);
	}

	@Override
	@Transactional
	public NhomQuyen update(NhomQuyenDTO nhomQuyenDTO) {
		NhomQuyen nhomQuyen = modelMapper.map(nhomQuyenDTO, NhomQuyen.class);
		NhomQuyen currentNhomQuyen = nhomQuyenRepo.findById(nhomQuyen.getId()).orElse(null);
		if (currentNhomQuyen != null) {
			return nhomQuyenRepo.save(nhomQuyen);
		}
		return null;
	}

	@Override
	@Transactional
	public void delete(Integer id) {
		nhomQuyenRepo.deleteById(id);
	}
}
