package com.example.hieuthuoc.service;

import com.example.hieuthuoc.dto.ChiTietNhomQuyenDTO;
import com.example.hieuthuoc.entity.ChiTietNhomQuyen;
import com.example.hieuthuoc.repository.ChiTietNhomQuyenRepo;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

public interface ChiTietNhomQuyenService {
    List<ChiTietNhomQuyen> getAllChiTietNhomQuyens();
    Optional<ChiTietNhomQuyen> getChiTietNhomQuyenById(Integer id);
    ChiTietNhomQuyen create(ChiTietNhomQuyenDTO chiTietNhomQuyenDTO);
    ChiTietNhomQuyen update(ChiTietNhomQuyenDTO chiTietNhomQuyenDTO);
    void delete(Integer id);
}

@Service
class ChiTietNhomQuyenServiceImpl implements ChiTietNhomQuyenService {

    @Autowired
    private ChiTietNhomQuyenRepo chiTietNhomQuyenRepo;

    ModelMapper modelMapper = new ModelMapper();

    @Override
    public List<ChiTietNhomQuyen> getAllChiTietNhomQuyens() {
        return chiTietNhomQuyenRepo.findAll();
    }

    @Override
    public Optional<ChiTietNhomQuyen> getChiTietNhomQuyenById(Integer id) {
        return chiTietNhomQuyenRepo.findById(id);
    }

    @Override
    @Transactional
    public ChiTietNhomQuyen create(ChiTietNhomQuyenDTO chiTietNhomQuyenDTO) {
        ChiTietNhomQuyen chiTietNhomQuyen = modelMapper.map(chiTietNhomQuyenDTO, ChiTietNhomQuyen.class);
        return chiTietNhomQuyenRepo.save(chiTietNhomQuyen);
    }

    @Override
    @Transactional
    public ChiTietNhomQuyen update(ChiTietNhomQuyenDTO chiTietNhomQuyenDTO) {
        ChiTietNhomQuyen chiTietNhomQuyen = modelMapper.map(chiTietNhomQuyenDTO, ChiTietNhomQuyen.class);
        ChiTietNhomQuyen currentChiTietNhomQuyen = chiTietNhomQuyenRepo.findById(chiTietNhomQuyen.getId()).orElse(null);
        if (currentChiTietNhomQuyen != null) {
            return chiTietNhomQuyenRepo.save(chiTietNhomQuyen);
        }
        return null;
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        chiTietNhomQuyenRepo.deleteById(id);
    }
}
