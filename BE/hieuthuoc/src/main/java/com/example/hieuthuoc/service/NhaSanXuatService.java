package com.example.hieuthuoc.service;

import com.example.hieuthuoc.dto.NhaSanXuatDTO;
import com.example.hieuthuoc.entity.NhaSanXuat;
import com.example.hieuthuoc.repository.NhaSanXuatRepo;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

public interface NhaSanXuatService {
    List<NhaSanXuat> getAllNhaSanXuats();
    Optional<NhaSanXuat> getNhaSanXuatById(Integer id);
    NhaSanXuat create(NhaSanXuatDTO nhaSanXuatDTO);
    NhaSanXuat update(NhaSanXuatDTO nhaSanXuatDTO);
    void delete(Integer id);
}

@Service
class NhaSanXuatServiceImpl implements NhaSanXuatService {

    @Autowired
    private NhaSanXuatRepo nhaSanXuatRepo;

    ModelMapper modelMapper = new ModelMapper();

    @Override
    public List<NhaSanXuat> getAllNhaSanXuats() {
        return nhaSanXuatRepo.findAll();
    }

    @Override
    public Optional<NhaSanXuat> getNhaSanXuatById(Integer id) {
        return nhaSanXuatRepo.findById(id);
    }

    @Override
    @Transactional
    public NhaSanXuat create(NhaSanXuatDTO nhaSanXuatDTO) {
        NhaSanXuat nhaSanXuat = modelMapper.map(nhaSanXuatDTO, NhaSanXuat.class);
        return nhaSanXuatRepo.save(nhaSanXuat);
    }

    @Override
    @Transactional
    public NhaSanXuat update(NhaSanXuatDTO nhaSanXuatDTO) {
        NhaSanXuat nhaSanXuat = modelMapper.map(nhaSanXuatDTO, NhaSanXuat.class);
        NhaSanXuat currentNhaSanXuat = nhaSanXuatRepo.findById(nhaSanXuat.getId()).orElse(null);
        if (currentNhaSanXuat != null) {
            return nhaSanXuatRepo.save(nhaSanXuat);
        }
        return null;
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        nhaSanXuatRepo.deleteById(id);
    }
}
