package com.example.hieuthuoc.service;

import com.example.hieuthuoc.dto.DanhMucThuocDTO;
import com.example.hieuthuoc.entity.DanhMucThuoc;
import com.example.hieuthuoc.repository.DanhMucThuocRepo;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

public interface DanhMucThuocService {
    List<DanhMucThuoc> getAllDanhMucThuocs();
    Optional<DanhMucThuoc> getDanhMucThuocById(Integer id);
    DanhMucThuoc save(DanhMucThuocDTO danhMucThuocDTO);
    DanhMucThuoc update(DanhMucThuocDTO danhMucThuocDTO);
    void delete(Integer id);
}

@Service
class DanhMucThuocServiceImpl implements DanhMucThuocService {

    @Autowired
    private DanhMucThuocRepo danhMucThuocRepo;

    ModelMapper modelMapper = new ModelMapper();

    @Override
    public List<DanhMucThuoc> getAllDanhMucThuocs() {
        return danhMucThuocRepo.findAll();
    }

    @Override
    public Optional<DanhMucThuoc> getDanhMucThuocById(Integer id) {
        return danhMucThuocRepo.findById(id);
    }

    @Override
    @Transactional
    public DanhMucThuoc save(DanhMucThuocDTO danhMucThuocDTO) {
        DanhMucThuoc danhMucThuoc = modelMapper.map(danhMucThuocDTO, DanhMucThuoc.class);
        return danhMucThuocRepo.save(danhMucThuoc);
    }

    @Override
    @Transactional
    public DanhMucThuoc update(DanhMucThuocDTO danhMucThuocDTO) {
        DanhMucThuoc danhMucThuoc = modelMapper.map(danhMucThuocDTO, DanhMucThuoc.class);
        DanhMucThuoc currentDanhMucThuoc = danhMucThuocRepo.findById(danhMucThuoc.getId()).orElse(null);
        if (currentDanhMucThuoc != null) {
            return danhMucThuocRepo.save(danhMucThuoc);
        }
        return null;
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        danhMucThuocRepo.deleteById(id);
    }
}
