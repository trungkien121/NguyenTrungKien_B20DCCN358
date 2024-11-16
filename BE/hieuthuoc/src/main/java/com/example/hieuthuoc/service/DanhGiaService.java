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

import com.example.hieuthuoc.dto.DanhGiaDTO;
import com.example.hieuthuoc.dto.PageDTO;
import com.example.hieuthuoc.dto.SearchDTO;
import com.example.hieuthuoc.entity.DanhGia;
import com.example.hieuthuoc.repository.DanhGiaRepo;

public interface DanhGiaService {
	PageDTO<List<DanhGiaDTO>> getByThuocId(SearchDTO searchDTO);
    Optional<DanhGiaDTO> getById(Integer id);
    DanhGia create(DanhGiaDTO danhGiaDTO);
    DanhGia update(DanhGiaDTO danhGiaDTO);
    void delete(Integer id);
}

@Service
class DanhGiaServiceImpl implements DanhGiaService {

    @Autowired
    private DanhGiaRepo danhGiaRepo;

    ModelMapper modelMapper = new ModelMapper();

    @Override
    public PageDTO<List<DanhGiaDTO>> getByThuocId(SearchDTO searchDTO) {
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
	
		if (searchDTO.getKeyWord() == null) {
			searchDTO.setKeyWord("");
		}
		
		PageRequest pageRequest = PageRequest.of(searchDTO.getCurrentPage(), searchDTO.getSize(), sortBy);
		Page<DanhGia> page = danhGiaRepo.findByThuocId(searchDTO.getId(), pageRequest);

		PageDTO<List<DanhGiaDTO>> pageDTO = new PageDTO<>();
		pageDTO.setTotalElements(page.getTotalElements());
		pageDTO.setTotalPages(page.getTotalPages());

		List<DanhGiaDTO> danhGiaDTOs = page.get().map(danhGia -> modelMapper.map(danhGia, DanhGiaDTO.class))
				.collect(Collectors.toList());

		pageDTO.setData(danhGiaDTOs);

		return pageDTO;
    }

    @Override
    public Optional<DanhGiaDTO> getById(Integer id) {
        Optional<DanhGia> danhGia = danhGiaRepo.findById(id);
        if (danhGia.isPresent()) {
        	DanhGiaDTO danhGiaDTO = modelMapper.map(danhGia.get(), DanhGiaDTO.class);
            return Optional.of(danhGiaDTO);
        }
        return Optional.empty();
    }

    @Override
    @Transactional
    public DanhGia create(DanhGiaDTO danhGiaDTO) {
        DanhGia danhGia = modelMapper.map(danhGiaDTO, DanhGia.class);
        return danhGiaRepo.save(danhGia);
    }

    @Override
    @Transactional
    public DanhGia update(DanhGiaDTO danhGiaDTO) {
        DanhGia danhGia = modelMapper.map(danhGiaDTO, DanhGia.class);
        DanhGia currentDanhGia = danhGiaRepo.findById(danhGia.getId()).orElse(null);
        if (currentDanhGia != null) {
            return danhGiaRepo.save(danhGia);
        }
        return null;
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        danhGiaRepo.deleteById(id);
    }
}
