package com.example.hieuthuoc.service;

import com.example.hieuthuoc.dto.NhaCungCapDTO;
import com.example.hieuthuoc.entity.NhaCungCap;
import com.example.hieuthuoc.repository.NhaCungCapRepo;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

public interface NhaCungCapService {
    List<NhaCungCap> getAllNhaCungCaps();
    Optional<NhaCungCap> getNhaCungCapById(Integer id);
    NhaCungCap create(NhaCungCapDTO nhaCungCapDTO);
    NhaCungCap update(NhaCungCapDTO nhaCungCapDTO);
    void delete(Integer id);
}

@Service
class NhaCungCapServiceImpl implements NhaCungCapService {

    @Autowired
    private NhaCungCapRepo nhaCungCapRepo;

    ModelMapper modelMapper = new ModelMapper();

    @Override
    public List<NhaCungCap> getAllNhaCungCaps() {
        return nhaCungCapRepo.findAll();
    }

    @Override
    public Optional<NhaCungCap> getNhaCungCapById(Integer id) {
        return nhaCungCapRepo.findById(id);
    }

    @Override
    @Transactional
    public NhaCungCap create(NhaCungCapDTO nhaCungCapDTO) {
        NhaCungCap nhaCungCap = modelMapper.map(nhaCungCapDTO, NhaCungCap.class);
        return nhaCungCapRepo.save(nhaCungCap);
    }

    @Override
    @Transactional
    public NhaCungCap update(NhaCungCapDTO nhaCungCapDTO) {
        NhaCungCap nhaCungCap = modelMapper.map(nhaCungCapDTO, NhaCungCap.class);
        NhaCungCap currentNhaCungCap = nhaCungCapRepo.findById(nhaCungCap.getId()).orElse(null);
        if (currentNhaCungCap != null) {
            return nhaCungCapRepo.save(nhaCungCap);
        }
        return null;
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        nhaCungCapRepo.deleteById(id);
    }
}
