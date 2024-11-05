package com.example.hieuthuoc.service;

import com.example.hieuthuoc.dto.DanhGiaDTO;
import com.example.hieuthuoc.entity.DanhGia;
import com.example.hieuthuoc.repository.DanhGiaRepo;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

public interface DanhGiaService {
    List<DanhGia> getAllDanhGias();
    Optional<DanhGia> getDanhGiaById(Integer id);
    DanhGia save(DanhGiaDTO danhGiaDTO);
    DanhGia update(DanhGiaDTO danhGiaDTO);
    void delete(Integer id);
}

@Service
class DanhGiaServiceImpl implements DanhGiaService {

    @Autowired
    private DanhGiaRepo danhGiaRepo;

    ModelMapper modelMapper = new ModelMapper();

    @Override
    public List<DanhGia> getAllDanhGias() {
        return danhGiaRepo.findAll();
    }

    @Override
    public Optional<DanhGia> getDanhGiaById(Integer id) {
        return danhGiaRepo.findById(id);
    }

    @Override
    @Transactional
    public DanhGia save(DanhGiaDTO danhGiaDTO) {
        DanhGia danhGia = modelMapper.map(danhGiaDTO, DanhGia.class);
        return danhGiaRepo.save(danhGia);
    }

    @Override
    @Transactional
    public DanhGia update(DanhGiaDTO danhGiaDTO) {
        DanhGia danhGia = modelMapper.map(danhGiaDTO, DanhGia.class);
        DanhGia currentDanhGia = danhGiaRepo.findById(danhGia.getId()).orElse(null);
        if (currentDanhGia != null) {
            return danhGiaRepo.save(danhGia);
        }
        return null;
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        danhGiaRepo.deleteById(id);
    }
}
