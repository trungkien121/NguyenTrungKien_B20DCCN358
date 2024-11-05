package com.example.hieuthuoc.service;

import com.example.hieuthuoc.dto.DonHangDTO;
import com.example.hieuthuoc.entity.DonHang;
import com.example.hieuthuoc.repository.DonHangRepo;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

public interface DonHangService {
    List<DonHang> getAllDonHangs();
    Optional<DonHang> getDonHangById(Integer id);
    DonHang save(DonHangDTO donHangDTO);
    DonHang update(DonHangDTO donHangDTO);
    void delete(Integer id);
}

@Service
class DonHangServiceImpl implements DonHangService {

    @Autowired
    private DonHangRepo donHangRepo;

    ModelMapper modelMapper = new ModelMapper();

    @Override
    public List<DonHang> getAllDonHangs() {
        return donHangRepo.findAll();
    }

    @Override
    public Optional<DonHang> getDonHangById(Integer id) {
        return donHangRepo.findById(id);
    }

    @Override
    @Transactional
    public DonHang save(DonHangDTO donHangDTO) {
        DonHang donHang = modelMapper.map(donHangDTO, DonHang.class);
        return donHangRepo.save(donHang);
    }

    @Override
    @Transactional
    public DonHang update(DonHangDTO donHangDTO) {
        DonHang donHang = modelMapper.map(donHangDTO, DonHang.class);
        DonHang currentDonHang = donHangRepo.findById(donHang.getId()).orElse(null);
        if (currentDonHang != null) {
            return donHangRepo.save(donHang);
        }
        return null;
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        donHangRepo.deleteById(id);
    }
}
