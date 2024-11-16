package com.example.hieuthuoc.service;

import com.example.hieuthuoc.dto.ChiTietKhuyenMaiDTO;
import com.example.hieuthuoc.entity.ChiTietKhuyenMai;
import com.example.hieuthuoc.repository.ChiTietKhuyenMaiRepo;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

public interface ChiTietKhuyenMaiService {
    List<ChiTietKhuyenMai> getAllChiTietKhuyenMais();
    Optional<ChiTietKhuyenMai> getChiTietKhuyenMaiById(Integer id);
    ChiTietKhuyenMai create(ChiTietKhuyenMaiDTO chiTietKhuyenMaiDTO);
    ChiTietKhuyenMai update(ChiTietKhuyenMaiDTO chiTietKhuyenMaiDTO);
    void delete(Integer id);
}

@Service
class ChiTietKhuyenMaiServiceImpl implements ChiTietKhuyenMaiService {

    @Autowired
    private ChiTietKhuyenMaiRepo chiTietKhuyenMaiRepo;

    ModelMapper modelMapper = new ModelMapper();

    @Override
    public List<ChiTietKhuyenMai> getAllChiTietKhuyenMais() {
        return chiTietKhuyenMaiRepo.findAll();
    }

    @Override
    public Optional<ChiTietKhuyenMai> getChiTietKhuyenMaiById(Integer id) {
        return chiTietKhuyenMaiRepo.findById(id);
    }

    @Override
    @Transactional
    public ChiTietKhuyenMai create(ChiTietKhuyenMaiDTO chiTietKhuyenMaiDTO) {
        ChiTietKhuyenMai chiTietKhuyenMai = modelMapper.map(chiTietKhuyenMaiDTO, ChiTietKhuyenMai.class);
        return chiTietKhuyenMaiRepo.save(chiTietKhuyenMai);
    }

    @Override
    @Transactional
    public ChiTietKhuyenMai update(ChiTietKhuyenMaiDTO chiTietKhuyenMaiDTO) {
        ChiTietKhuyenMai chiTietKhuyenMai = modelMapper.map(chiTietKhuyenMaiDTO, ChiTietKhuyenMai.class);
        ChiTietKhuyenMai currentChiTietKhuyenMai = chiTietKhuyenMaiRepo.findById(chiTietKhuyenMai.getId()).orElse(null);
        if (currentChiTietKhuyenMai != null) {
            return chiTietKhuyenMaiRepo.save(chiTietKhuyenMai);
        }
        return null;
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        chiTietKhuyenMaiRepo.deleteById(id);
    }
}
