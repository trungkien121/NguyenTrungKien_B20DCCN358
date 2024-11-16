package com.example.hieuthuoc.service;

import com.example.hieuthuoc.dto.ChiTietChucNangDTO;
import com.example.hieuthuoc.entity.ChiTietChucNang;
import com.example.hieuthuoc.repository.ChiTietChucNangRepo;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

public interface ChiTietChucNangService {
    List<ChiTietChucNang> getAllChiTietChucNangs();
    Optional<ChiTietChucNang> getChiTietChucNangById(Integer id);
    ChiTietChucNang create(ChiTietChucNangDTO chiTietChucNangDTO);
    ChiTietChucNang update(ChiTietChucNangDTO chiTietChucNangDTO);
    void delete(Integer id);
}

@Service
class ChiTietChucNangServiceImpl implements ChiTietChucNangService {

    @Autowired
    private ChiTietChucNangRepo chiTietChucNangRepo;

    ModelMapper modelMapper = new ModelMapper();

    @Override
    public List<ChiTietChucNang> getAllChiTietChucNangs() {
        return chiTietChucNangRepo.findAll();
    }

    @Override
    public Optional<ChiTietChucNang> getChiTietChucNangById(Integer id) {
        return chiTietChucNangRepo.findById(id);
    }

    @Override
    @Transactional
    public ChiTietChucNang create(ChiTietChucNangDTO chiTietChucNangDTO) {
        ChiTietChucNang chiTietChucNang = modelMapper.map(chiTietChucNangDTO, ChiTietChucNang.class);
        return chiTietChucNangRepo.save(chiTietChucNang);
    }

    @Override
    @Transactional
    public ChiTietChucNang update(ChiTietChucNangDTO chiTietChucNangDTO) {
        ChiTietChucNang chiTietChucNang = modelMapper.map(chiTietChucNangDTO, ChiTietChucNang.class);
        ChiTietChucNang currentChiTietChucNang = chiTietChucNangRepo.findById(chiTietChucNang.getId()).orElse(null);
        if (currentChiTietChucNang != null) {
            return chiTietChucNangRepo.save(chiTietChucNang);
        }
        return null;
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        chiTietChucNangRepo.deleteById(id);
    }
}
