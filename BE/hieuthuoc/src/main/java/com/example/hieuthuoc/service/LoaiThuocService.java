package com.example.hieuthuoc.service;

import com.example.hieuthuoc.dto.LoaiThuocDTO;
import com.example.hieuthuoc.entity.LoaiThuoc;
import com.example.hieuthuoc.repository.LoaiThuocRepo;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

public interface LoaiThuocService {
    List<LoaiThuoc> getAllLoaiThuocs();
    Optional<LoaiThuoc> getLoaiThuocById(Integer id);
    LoaiThuoc save(LoaiThuocDTO loaiThuocDTO);
    LoaiThuoc update(LoaiThuocDTO loaiThuocDTO);
    void delete(Integer id);
}

@Service
class LoaiThuocServiceImpl implements LoaiThuocService {

    @Autowired
    private LoaiThuocRepo loaiThuocRepo;

    ModelMapper modelMapper = new ModelMapper();

    @Override
    public List<LoaiThuoc> getAllLoaiThuocs() {
        return loaiThuocRepo.findAll();
    }

    @Override
    public Optional<LoaiThuoc> getLoaiThuocById(Integer id) {
        return loaiThuocRepo.findById(id);
    }

    @Override
    @Transactional
    public LoaiThuoc save(LoaiThuocDTO loaiThuocDTO) {
        LoaiThuoc loaiThuoc = modelMapper.map(loaiThuocDTO, LoaiThuoc.class);
        return loaiThuocRepo.save(loaiThuoc);
    }

    @Override
    @Transactional
    public LoaiThuoc update(LoaiThuocDTO loaiThuocDTO) {
        LoaiThuoc loaiThuoc = modelMapper.map(loaiThuocDTO, LoaiThuoc.class);
        LoaiThuoc currentLoaiThuoc = loaiThuocRepo.findById(loaiThuoc.getId()).orElse(null);
        if (currentLoaiThuoc != null) {
            return loaiThuocRepo.save(loaiThuoc);
        }
        return null;
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        loaiThuocRepo.deleteById(id);
    }
}
