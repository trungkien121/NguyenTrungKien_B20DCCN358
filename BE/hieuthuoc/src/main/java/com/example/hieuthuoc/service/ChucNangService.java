package com.example.hieuthuoc.service;

import com.example.hieuthuoc.dto.ChucNangDTO;
import com.example.hieuthuoc.entity.ChucNang;
import com.example.hieuthuoc.repository.ChucNangRepo;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

public interface ChucNangService {
    List<ChucNang> getAllChucNangs();
    Optional<ChucNang> getChucNangById(Integer id);
    ChucNang create(ChucNangDTO chucNangDTO);
    ChucNang update(ChucNangDTO chucNangDTO);
    void delete(Integer id);
}

@Service
class ChucNangServiceImpl implements ChucNangService {

    @Autowired
    private ChucNangRepo chucNangRepo;

    ModelMapper modelMapper = new ModelMapper();

    @Override
    public List<ChucNang> getAllChucNangs() {
        return chucNangRepo.findAll();
    }

    @Override
    public Optional<ChucNang> getChucNangById(Integer id) {
        return chucNangRepo.findById(id);
    }

    @Override
    @Transactional
    public ChucNang create(ChucNangDTO chucNangDTO) {
        ChucNang chucNang = modelMapper.map(chucNangDTO, ChucNang.class);
        return chucNangRepo.save(chucNang);
    }

    @Override
    @Transactional
    public ChucNang update(ChucNangDTO chucNangDTO) {
        ChucNang chucNang = modelMapper.map(chucNangDTO, ChucNang.class);
        ChucNang currentChucNang = chucNangRepo.findById(chucNang.getId()).orElse(null);
        if (currentChucNang != null) {
            return chucNangRepo.save(chucNang);
        }
        return null;
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        chucNangRepo.deleteById(id);
    }
}
