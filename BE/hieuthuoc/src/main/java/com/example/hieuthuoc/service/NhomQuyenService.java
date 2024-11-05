package com.example.hieuthuoc.service;

import com.example.hieuthuoc.dto.NhomQuyenDTO;
import com.example.hieuthuoc.entity.NhomQuyen;
import com.example.hieuthuoc.repository.NhomQuyenRepo;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

public interface NhomQuyenService {
    List<NhomQuyen> getAllNhomQuyens();
    Optional<NhomQuyen> getNhomQuyenById(Integer id);
    NhomQuyen save(NhomQuyenDTO nhomQuyenDTO);
    NhomQuyen update(NhomQuyenDTO nhomQuyenDTO);
    void delete(Integer id);
}

@Service
class NhomQuyenServiceImpl implements NhomQuyenService {

    @Autowired
    private NhomQuyenRepo nhomQuyenRepo;

    ModelMapper modelMapper = new ModelMapper();

    @Override
    public List<NhomQuyen> getAllNhomQuyens() {
        return nhomQuyenRepo.findAll();
    }

    @Override
    public Optional<NhomQuyen> getNhomQuyenById(Integer id) {
        return nhomQuyenRepo.findById(id);
    }

    @Override
    @Transactional
    public NhomQuyen save(NhomQuyenDTO nhomQuyenDTO) {
        NhomQuyen nhomQuyen = modelMapper.map(nhomQuyenDTO, NhomQuyen.class);
        return nhomQuyenRepo.save(nhomQuyen);
    }

    @Override
    @Transactional
    public NhomQuyen update(NhomQuyenDTO nhomQuyenDTO) {
        NhomQuyen nhomQuyen = modelMapper.map(nhomQuyenDTO, NhomQuyen.class);
        NhomQuyen currentNhomQuyen = nhomQuyenRepo.findById(nhomQuyen.getId()).orElse(null);
        if (currentNhomQuyen != null) {
            return nhomQuyenRepo.save(nhomQuyen);
        }
        return null;
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        nhomQuyenRepo.deleteById(id);
    }
}
