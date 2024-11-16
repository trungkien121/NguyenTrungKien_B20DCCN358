package com.example.hieuthuoc.service;

import com.example.hieuthuoc.dto.GioHangDTO;
import com.example.hieuthuoc.entity.GioHang;
import com.example.hieuthuoc.repository.GioHangRepo;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

public interface GioHangService {
    List<GioHang> getAllGioHangs();
    Optional<GioHang> getGioHangById(Integer id);
    GioHang create(GioHangDTO gioHangDTO);
    GioHang update(GioHangDTO gioHangDTO);
    void delete(Integer id);
}

@Service
class GioHangServiceImpl implements GioHangService {

    @Autowired
    private GioHangRepo gioHangRepo;

    ModelMapper modelMapper = new ModelMapper();

    @Override
    public List<GioHang> getAllGioHangs() {
        return gioHangRepo.findAll();
    }

    @Override
    public Optional<GioHang> getGioHangById(Integer id) {
        return gioHangRepo.findById(id);
    }

    @Override
    @Transactional
    public GioHang create(GioHangDTO gioHangDTO) {
        GioHang gioHang = modelMapper.map(gioHangDTO, GioHang.class);
        return gioHangRepo.save(gioHang);
    }

    @Override
    @Transactional
    public GioHang update(GioHangDTO gioHangDTO) {
        GioHang gioHang = modelMapper.map(gioHangDTO, GioHang.class);
        GioHang currentGioHang = gioHangRepo.findById(gioHang.getId()).orElse(null);
        if (currentGioHang != null) {
            return gioHangRepo.save(gioHang);
        }
        return null;
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        gioHangRepo.deleteById(id);
    }
}
