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
import com.example.hieuthuoc.dto.ThongBaoDTO;
import com.example.hieuthuoc.entity.ThongBao;
import com.example.hieuthuoc.repository.ThongBaoRepo;

public interface ThongBaoService {
    PageDTO<List<ThongBaoDTO>> getByNguoiDungId(SearchDTO searchDTO);
    Optional<ThongBaoDTO> getById(Integer id);
    ThongBao create(ThongBaoDTO thuocDTO);
    ThongBao update(ThongBaoDTO thuocDTO);
    void delete(Integer id);
}

@Service
class ThongBaoServiceImpl implements ThongBaoService{
	
	@Autowired
	ThongBaoRepo thongBaoRepo;
	
    ModelMapper modelMapper = new ModelMapper();

	@Override
	public PageDTO<List<ThongBaoDTO>> getByNguoiDungId(SearchDTO searchDTO) {
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
			Page<ThongBao> page = thongBaoRepo.findByNguoiDungId(searchDTO.getId(), pageRequest);

			PageDTO<List<ThongBaoDTO>> pageDTO = new PageDTO<>();
			pageDTO.setTotalElements(page.getTotalElements());
			pageDTO.setTotalPages(page.getTotalPages());

			List<ThongBaoDTO> thongBaoDTOs = page.get().map(danhGia -> modelMapper.map(danhGia, ThongBaoDTO.class))
					.collect(Collectors.toList());

			pageDTO.setData(thongBaoDTOs);

			return pageDTO;
	}

    @Override
    public Optional<ThongBaoDTO> getById(Integer id) {
        Optional<ThongBao> thongBao = thongBaoRepo.findById(id);
        if (thongBao.isPresent()) {
        	ThongBaoDTO thongBaoDTO = modelMapper.map(thongBao.get(), ThongBaoDTO.class);
            return Optional.of(thongBaoDTO);
        }
        return Optional.empty();
    }

    @Override
    @Transactional
    public ThongBao create(ThongBaoDTO thongBaoDTO) {
    	ThongBao thongBao = modelMapper.map(thongBaoDTO, ThongBao.class);
        return thongBaoRepo.save(thongBao);
    }

    @Override
    @Transactional
    public ThongBao update(ThongBaoDTO thongBaoDTO) {
    	ThongBao thongBao = modelMapper.map(thongBaoDTO, ThongBao.class);
    	ThongBao currentThongBao = thongBaoRepo.findById(thongBao.getId()).orElse(null);
        if (currentThongBao != null) {
            return thongBaoRepo.save(thongBao);
        }
        return null;
    }

    @Override
    @Transactional
    public void delete(Integer id) {
    	thongBaoRepo.deleteById(id);
    }
	
}