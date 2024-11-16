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
import com.example.hieuthuoc.dto.SearchDTO;
import com.example.hieuthuoc.dto.ThuocDTO;
import com.example.hieuthuoc.entity.Thuoc;
import com.example.hieuthuoc.repository.ThuocRepo;

public interface ThuocService {
    PageDTO<List<ThuocDTO>> getByTenThuoc(SearchDTO searchDTO);
    Optional<ThuocDTO> getById(Integer id);
    Thuoc create(ThuocDTO thuocDTO);
    Thuoc update(ThuocDTO thuocDTO);
    void delete(Integer id);
}

@Service
class ThuocServiceImpl implements ThuocService {

    @Autowired
    private ThuocRepo thuocRepo;
    
    ModelMapper modelMapper = new ModelMapper();

    @Override
    public PageDTO<List<ThuocDTO>> getByTenThuoc(SearchDTO searchDTO) {
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
		Page<Thuoc> page = thuocRepo.findByTenThuoc("%" + searchDTO.getKeyWord() + "%", pageRequest);

		PageDTO<List<ThuocDTO>> pageDTO = new PageDTO<>();
		pageDTO.setTotalElements(page.getTotalElements());
		pageDTO.setTotalPages(page.getTotalPages());

		List<ThuocDTO> thuocDTOs = page.get().map(thuoc -> modelMapper.map(thuoc, ThuocDTO.class))
				.collect(Collectors.toList());

		pageDTO.setData(thuocDTOs);

		return pageDTO;
    }

    @Override
    public Optional<ThuocDTO> getById(Integer id) {
        Optional<Thuoc> thuoc = thuocRepo.findById(id);
        if (thuoc.isPresent()) {
            ThuocDTO thuocDTO = modelMapper.map(thuoc.get(), ThuocDTO.class);
            return Optional.of(thuocDTO);
        }
        return Optional.empty();
    }

    @Override
    @Transactional 
    public Thuoc create(ThuocDTO thuocDTO) {
    	Thuoc thuoc = modelMapper.map(thuocDTO, Thuoc.class);
        return thuocRepo.save(thuoc);
    }

    @Override
    @Transactional 
    public Thuoc update(ThuocDTO thuocDTO) {
    	Thuoc thuoc = modelMapper.map(thuocDTO, Thuoc.class);
    	Thuoc curentThuoc = thuocRepo.findById(thuoc.getId()).orElse(null);
  	
    	if(curentThuoc != null) {
    		return thuocRepo.save(thuoc);
    	}    	
    	 return null;
    }

    @Override
    @Transactional 
    public void delete(Integer id) {
        thuocRepo.deleteById(id);
    }
}