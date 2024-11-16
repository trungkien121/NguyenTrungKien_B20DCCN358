package com.example.hieuthuoc.service;

import com.example.hieuthuoc.dto.PhieuNhapDTO;
import com.example.hieuthuoc.entity.PhieuNhap;
import com.example.hieuthuoc.repository.PhieuNhapRepo;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

public interface PhieuNhapService {
    List<PhieuNhap> getAllPhieuNhaps();
    Optional<PhieuNhap> getPhieuNhapById(Integer id);
    PhieuNhap create(PhieuNhapDTO phieuNhapDTO);
    PhieuNhap update(PhieuNhapDTO phieuNhapDTO);
    void delete(Integer id);
}

@Service
class PhieuNhapServiceImpl implements PhieuNhapService {

    @Autowired
    private PhieuNhapRepo phieuNhapRepo;

    ModelMapper modelMapper = new ModelMapper();

    @Override
    public List<PhieuNhap> getAllPhieuNhaps() {
        return phieuNhapRepo.findAll();
    }

    @Override
    public Optional<PhieuNhap> getPhieuNhapById(Integer id) {
        return phieuNhapRepo.findById(id);
    }

    @Override
    @Transactional
    public PhieuNhap create(PhieuNhapDTO phieuNhapDTO) {
        PhieuNhap phieuNhap = modelMapper.map(phieuNhapDTO, PhieuNhap.class);
        return phieuNhapRepo.save(phieuNhap);
    }

    @Override
    @Transactional
    public PhieuNhap update(PhieuNhapDTO phieuNhapDTO) {
        PhieuNhap phieuNhap = modelMapper.map(phieuNhapDTO, PhieuNhap.class);
        PhieuNhap currentPhieuNhap = phieuNhapRepo.findById(phieuNhap.getId()).orElse(null);
        if (currentPhieuNhap != null) {
            return phieuNhapRepo.save(phieuNhap);
        }
        return null;
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        phieuNhapRepo.deleteById(id);
    }
}
