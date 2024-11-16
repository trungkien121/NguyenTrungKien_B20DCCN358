package com.example.hieuthuoc.service;

import com.example.hieuthuoc.dto.TonKhoDTO;
import com.example.hieuthuoc.entity.TonKho;
import com.example.hieuthuoc.repository.TonKhoRepo;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

public interface TonKhoService {
    List<TonKho> getAllTonKhos();
    Optional<TonKho> getTonKhoById(Integer id);
    TonKho create(TonKhoDTO tonKhoDTO);
    TonKho update(TonKhoDTO tonKhoDTO);
    void delete(Integer id);
}

@Service
class TonKhoServiceImpl implements TonKhoService {

    @Autowired
    private TonKhoRepo tonKhoRepo;

    ModelMapper modelMapper = new ModelMapper();

    @Override
    public List<TonKho> getAllTonKhos() {
        return tonKhoRepo.findAll();
    }

    @Override
    public Optional<TonKho> getTonKhoById(Integer id) {
        return tonKhoRepo.findById(id);
    }

    @Override
    @Transactional
    public TonKho create(TonKhoDTO tonKhoDTO) {
        TonKho tonKho = modelMapper.map(tonKhoDTO, TonKho.class);
        return tonKhoRepo.save(tonKho);
    }

    @Override
    @Transactional
    public TonKho update(TonKhoDTO tonKhoDTO) {
        TonKho tonKho = modelMapper.map(tonKhoDTO, TonKho.class);
        TonKho currentTonKho = tonKhoRepo.findById(tonKho.getId()).orElse(null);
        if (currentTonKho != null) {
            return tonKhoRepo.save(tonKho);
        }
        return null;
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        tonKhoRepo.deleteById(id);
    }
}
