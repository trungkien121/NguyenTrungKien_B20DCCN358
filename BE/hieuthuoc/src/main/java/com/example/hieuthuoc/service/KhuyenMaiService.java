package com.example.hieuthuoc.service;

import com.example.hieuthuoc.dto.KhuyenMaiDTO;
import com.example.hieuthuoc.entity.KhuyenMai;
import com.example.hieuthuoc.repository.KhuyenMaiRepo;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

public interface KhuyenMaiService {
    List<KhuyenMai> getAllKhuyenMais();
    Optional<KhuyenMai> getKhuyenMaiById(Integer id);
    KhuyenMai create(KhuyenMaiDTO khuyenMaiDTO);
    KhuyenMai update(KhuyenMaiDTO khuyenMaiDTO);
    void delete(Integer id);
}

@Service
class KhuyenMaiServiceImpl implements KhuyenMaiService {

    @Autowired
    private KhuyenMaiRepo khuyenMaiRepo;

    ModelMapper modelMapper = new ModelMapper();

    @Override
    public List<KhuyenMai> getAllKhuyenMais() {
        return khuyenMaiRepo.findAll();
    }

    @Override
    public Optional<KhuyenMai> getKhuyenMaiById(Integer id) {
        return khuyenMaiRepo.findById(id);
    }

    @Override
    @Transactional
    public KhuyenMai create(KhuyenMaiDTO khuyenMaiDTO) {
        KhuyenMai khuyenMai = modelMapper.map(khuyenMaiDTO, KhuyenMai.class);
        return khuyenMaiRepo.save(khuyenMai);
    }

    @Override
    @Transactional
    public KhuyenMai update(KhuyenMaiDTO khuyenMaiDTO) {
        KhuyenMai khuyenMai = modelMapper.map(khuyenMaiDTO, KhuyenMai.class);
        KhuyenMai currentKhuyenMai = khuyenMaiRepo.findById(khuyenMai.getId()).orElse(null);
        if (currentKhuyenMai != null) {
            return khuyenMaiRepo.save(khuyenMai);
        }
        return null;
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        khuyenMaiRepo.deleteById(id);
    }
}
