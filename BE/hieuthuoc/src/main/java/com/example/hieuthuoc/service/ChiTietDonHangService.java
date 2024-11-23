package com.example.hieuthuoc.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.hieuthuoc.dto.ChiTietDonHangDTO;
import com.example.hieuthuoc.entity.ChiTietDonHang;
import com.example.hieuthuoc.repository.ChiTietDonHangRepo;

public interface ChiTietDonHangService {
    List<ChiTietDonHang> getByDonHangId();
    ChiTietDonHang create(ChiTietDonHangDTO chiTietDonHangDTO);
    ChiTietDonHang update(ChiTietDonHangDTO chiTietDonHangDTO);
    void delete(Integer id);
}

@Service
class ChiTietDonHangServiceImpl implements ChiTietDonHangService {

    @Autowired
    private ChiTietDonHangRepo chiTietDonHangRepo;

    ModelMapper modelMapper = new ModelMapper();

    @Override
    public List<ChiTietDonHang> getByDonHangId() {
        return chiTietDonHangRepo.findAll();
    }

    @Override
    @Transactional
    public ChiTietDonHang create(ChiTietDonHangDTO chiTietDonHangDTO) {
        ChiTietDonHang chiTietDonHang = modelMapper.map(chiTietDonHangDTO, ChiTietDonHang.class);
        return chiTietDonHangRepo.save(chiTietDonHang);
    }

    @Override
    @Transactional
    public ChiTietDonHang update(ChiTietDonHangDTO chiTietDonHangDTO) {
        ChiTietDonHang chiTietDonHang = modelMapper.map(chiTietDonHangDTO, ChiTietDonHang.class);
        ChiTietDonHang currentChiTietDonHang = chiTietDonHangRepo.findById(chiTietDonHang.getId()).orElse(null);
        if (currentChiTietDonHang != null) {
            return chiTietDonHangRepo.save(chiTietDonHang);
        }
        return null;
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        chiTietDonHangRepo.deleteById(id);
    }
}
