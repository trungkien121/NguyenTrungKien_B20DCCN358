package com.example.hieuthuoc.service;

import com.example.hieuthuoc.dto.ThuocDTO;
import com.example.hieuthuoc.entity.Thuoc;
import com.example.hieuthuoc.repository.ThuocRepo;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

public interface ThuocService {
    List<Thuoc> getAllThuocs();
    Optional<ThuocDTO> getThuocById(Integer id);
    Thuoc save(ThuocDTO thuocDTO);
    Thuoc update(ThuocDTO thuocDTO);
    void delete(Integer id);
}

@Service
class ThuocServiceImpl implements ThuocService {

    @Autowired
    private ThuocRepo thuocRepo;
    
    ModelMapper modelMapper = new ModelMapper();

    @Override
    public List<Thuoc> getAllThuocs() {
        return thuocRepo.findAll();
    }

    @Override
    public Optional<ThuocDTO> getThuocById(Integer id) {
        Optional<Thuoc> thuoc = thuocRepo.findById(id);
        if (thuoc.isPresent()) {
            ThuocDTO thuocDTO = modelMapper.map(thuoc.get(), ThuocDTO.class);
            return Optional.of(thuocDTO);
        }
        return Optional.empty();
    }

    @Override
    @Transactional 
    public Thuoc save(ThuocDTO thuocDTO) {
    	Thuoc thuoc = modelMapper.map(thuocDTO, Thuoc.class);
        return thuocRepo.save(thuoc);
    }

    @Override
    @Transactional 
    public Thuoc update(ThuocDTO thuocDTO) {
    	Thuoc thuoc = modelMapper.map(thuocDTO, Thuoc.class);
    	Thuoc curentThuoc = thuocRepo.findById(thuoc.getId()).orElse(null);
    	if(curentThuoc != null) {
    		thuocRepo.save(thuoc);
    	}    	
    	 return null;
    }

    @Override
    @Transactional 
    public void delete(Integer id) {
        thuocRepo.deleteById(id);
    }
}