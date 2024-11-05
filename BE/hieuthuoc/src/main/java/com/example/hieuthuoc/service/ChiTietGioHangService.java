package com.example.hieuthuoc.service;

import com.example.hieuthuoc.dto.ChiTietGioHangDTO;
import com.example.hieuthuoc.entity.ChiTietGioHang;
import com.example.hieuthuoc.repository.ChiTietGioHangRepo;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

public interface ChiTietGioHangService {
    List<ChiTietGioHang> getAllChiTietGioHangs();
    Optional<ChiTietGioHang> getChiTietGioHangById(Integer id);
    ChiTietGioHang save(ChiTietGioHangDTO chiTietGioHangDTO);
    ChiTietGioHang update(ChiTietGioHangDTO chiTietGioHangDTO);
    void delete(Integer id);
}

@Service
class ChiTietGioHangServiceImpl implements ChiTietGioHangService {

    @Autowired
    private ChiTietGioHangRepo chiTietGioHangRepo;

    ModelMapper modelMapper = new ModelMapper();

    @Override
    public List<ChiTietGioHang> getAllChiTietGioHangs() {
        return chiTietGioHangRepo.findAll();
    }

    @Override
    public Optional<ChiTietGioHang> getChiTietGioHangById(Integer id) {
        return chiTietGioHangRepo.findById(id);
    }

    @Override
    @Transactional
    public ChiTietGioHang save(ChiTietGioHangDTO chiTietGioHangDTO) {
        ChiTietGioHang chiTietGioHang = modelMapper.map(chiTietGioHangDTO, ChiTietGioHang.class);
        return chiTietGioHangRepo.save(chiTietGioHang);
    }

    @Override
    @Transactional
    public ChiTietGioHang update(ChiTietGioHangDTO chiTietGioHangDTO) {
        ChiTietGioHang chiTietGioHang = modelMapper.map(chiTietGioHangDTO, ChiTietGioHang.class);
        ChiTietGioHang currentChiTietGioHang = chiTietGioHangRepo.findById(chiTietGioHang.getId()).orElse(null);
        if (currentChiTietGioHang != null) {
            return chiTietGioHangRepo.save(chiTietGioHang);
        }
        return null;
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        chiTietGioHangRepo.deleteById(id);
    }
}
