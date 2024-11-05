package com.example.hieuthuoc.service;

import com.example.hieuthuoc.dto.ChiTietPhieuNhapDTO;
import com.example.hieuthuoc.entity.ChiTietPhieuNhap;
import com.example.hieuthuoc.repository.ChiTietPhieuNhapRepo;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

public interface ChiTietPhieuNhapService {
    List<ChiTietPhieuNhap> getAllChiTietPhieuNhaps();
    Optional<ChiTietPhieuNhap> getChiTietPhieuNhapById(Integer id);
    ChiTietPhieuNhap save(ChiTietPhieuNhapDTO chiTietPhieuNhapDTO);
    ChiTietPhieuNhap update(ChiTietPhieuNhapDTO chiTietPhieuNhapDTO);
    void delete(Integer id);
}

@Service
class ChiTietPhieuNhapServiceImpl implements ChiTietPhieuNhapService {

    @Autowired
    private ChiTietPhieuNhapRepo chiTietPhieuNhapRepo;

    ModelMapper modelMapper = new ModelMapper();

    @Override
    public List<ChiTietPhieuNhap> getAllChiTietPhieuNhaps() {
        return chiTietPhieuNhapRepo.findAll();
    }

    @Override
    public Optional<ChiTietPhieuNhap> getChiTietPhieuNhapById(Integer id) {
        return chiTietPhieuNhapRepo.findById(id);
    }

    @Override
    @Transactional
    public ChiTietPhieuNhap save(ChiTietPhieuNhapDTO chiTietPhieuNhapDTO) {
        ChiTietPhieuNhap chiTietPhieuNhap = modelMapper.map(chiTietPhieuNhapDTO, ChiTietPhieuNhap.class);
        return chiTietPhieuNhapRepo.save(chiTietPhieuNhap);
    }

    @Override
    @Transactional
    public ChiTietPhieuNhap update(ChiTietPhieuNhapDTO chiTietPhieuNhapDTO) {
        ChiTietPhieuNhap chiTietPhieuNhap = modelMapper.map(chiTietPhieuNhapDTO, ChiTietPhieuNhap.class);
        ChiTietPhieuNhap currentChiTietPhieuNhap = chiTietPhieuNhapRepo.findById(chiTietPhieuNhap.getId()).orElse(null);
        if (currentChiTietPhieuNhap != null) {
            return chiTietPhieuNhapRepo.save(chiTietPhieuNhap);
        }
        return null;
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        chiTietPhieuNhapRepo.deleteById(id);
    }
}
