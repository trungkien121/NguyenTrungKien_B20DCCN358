package com.example.hieuthuoc.service;

import com.example.hieuthuoc.dto.ThanhPhanThuocDTO;
import com.example.hieuthuoc.entity.ThanhPhanThuoc;
import com.example.hieuthuoc.repository.ThanhPhanThuocRepo;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

public interface ThanhPhanThuocService {
    List<ThanhPhanThuoc> getAllThanhPhanThuocs();
    Optional<ThanhPhanThuoc> getThanhPhanThuocById(Integer id);
    ThanhPhanThuoc create(ThanhPhanThuocDTO thanhPhanThuocDTO);
    ThanhPhanThuoc update(ThanhPhanThuocDTO thanhPhanThuocDTO);
    void delete(Integer id);
}

@Service
class ThanhPhanThuocServiceImpl implements ThanhPhanThuocService {

    @Autowired
    private ThanhPhanThuocRepo thanhPhanThuocRepo;

    ModelMapper modelMapper = new ModelMapper();

    @Override
    public List<ThanhPhanThuoc> getAllThanhPhanThuocs() {
        return thanhPhanThuocRepo.findAll();
    }

    @Override
    public Optional<ThanhPhanThuoc> getThanhPhanThuocById(Integer id) {
        return thanhPhanThuocRepo.findById(id);
    }

    @Override
    @Transactional
    public ThanhPhanThuoc create(ThanhPhanThuocDTO thanhPhanThuocDTO) {
        ThanhPhanThuoc thanhPhanThuoc = modelMapper.map(thanhPhanThuocDTO, ThanhPhanThuoc.class);
        return thanhPhanThuocRepo.save(thanhPhanThuoc);
    }

    @Override
    @Transactional
    public ThanhPhanThuoc update(ThanhPhanThuocDTO thanhPhanThuocDTO) {
        ThanhPhanThuoc thanhPhanThuoc = modelMapper.map(thanhPhanThuocDTO, ThanhPhanThuoc.class);
        ThanhPhanThuoc currentThanhPhanThuoc = thanhPhanThuocRepo.findById(thanhPhanThuoc.getId()).orElse(null);
        if (currentThanhPhanThuoc != null) {
            return thanhPhanThuocRepo.save(thanhPhanThuoc);
        }
        return null;
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        thanhPhanThuocRepo.deleteById(id);
    }
}
