package com.example.hieuthuoc.service;

import com.example.hieuthuoc.dto.DoiTuongSdThuocDTO;
import com.example.hieuthuoc.entity.DoiTuongSdThuoc;
import com.example.hieuthuoc.repository.DoiTuongSdThuocRepo;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

public interface DoiTuongSdThuocService {
    List<DoiTuongSdThuoc> getAllDoiTuongSdThuocs();
    Optional<DoiTuongSdThuoc> getDoiTuongSdThuocById(Integer id);
    DoiTuongSdThuoc save(DoiTuongSdThuocDTO doiTuongSdThuocDTO);
    DoiTuongSdThuoc update(DoiTuongSdThuocDTO doiTuongSdThuocDTO);
    void delete(Integer id);
}

@Service
class DoiTuongSdThuocServiceImpl implements DoiTuongSdThuocService {

    @Autowired
    private DoiTuongSdThuocRepo doiTuongSdThuocRepo;

    ModelMapper modelMapper = new ModelMapper();

    @Override
    public List<DoiTuongSdThuoc> getAllDoiTuongSdThuocs() {
        return doiTuongSdThuocRepo.findAll();
    }

    @Override
    public Optional<DoiTuongSdThuoc> getDoiTuongSdThuocById(Integer id) {
        return doiTuongSdThuocRepo.findById(id);
    }

    @Override
    @Transactional
    public DoiTuongSdThuoc save(DoiTuongSdThuocDTO doiTuongSdThuocDTO) {
        DoiTuongSdThuoc doiTuongSdThuoc = modelMapper.map(doiTuongSdThuocDTO, DoiTuongSdThuoc.class);
        return doiTuongSdThuocRepo.save(doiTuongSdThuoc);
    }

    @Override
    @Transactional
    public DoiTuongSdThuoc update(DoiTuongSdThuocDTO doiTuongSdThuocDTO) {
        DoiTuongSdThuoc doiTuongSdThuoc = modelMapper.map(doiTuongSdThuocDTO, DoiTuongSdThuoc.class);
        DoiTuongSdThuoc currentDoiTuongSdThuoc = doiTuongSdThuocRepo.findById(doiTuongSdThuoc.getId()).orElse(null);
        if (currentDoiTuongSdThuoc != null) {
            return doiTuongSdThuocRepo.save(doiTuongSdThuoc);
        }
        return null;
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        doiTuongSdThuocRepo.deleteById(id);
    }
}
