package com.example.hieuthuoc.service;

import com.example.hieuthuoc.dto.DoiTuongDTO;
import com.example.hieuthuoc.entity.DoiTuong;
import com.example.hieuthuoc.repository.DoiTuongRepo;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

public interface DoiTuongService {
    List<DoiTuong> getAllDoiTuongs();
    Optional<DoiTuong> getDoiTuongById(Integer id);
    DoiTuong create(DoiTuongDTO doiTuongDTO);
    DoiTuong update(DoiTuongDTO doiTuongDTO);
    void delete(Integer id);
}

@Service
class DoiTuongServiceImpl implements DoiTuongService {

    @Autowired
    private DoiTuongRepo doiTuongRepo;

    ModelMapper modelMapper = new ModelMapper();

    @Override
    public List<DoiTuong> getAllDoiTuongs() {
        return doiTuongRepo.findAll();
    }

    @Override
    public Optional<DoiTuong> getDoiTuongById(Integer id) {
        return doiTuongRepo.findById(id);
    }

    @Override
    @Transactional
    public DoiTuong create(DoiTuongDTO doiTuongDTO) {
        DoiTuong doiTuong = modelMapper.map(doiTuongDTO, DoiTuong.class);
        return doiTuongRepo.save(doiTuong);
    }

    @Override
    @Transactional
    public DoiTuong update(DoiTuongDTO doiTuongDTO) {
        DoiTuong doiTuong = modelMapper.map(doiTuongDTO, DoiTuong.class);
        DoiTuong currentDoiTuong = doiTuongRepo.findById(doiTuong.getId()).orElse(null);
        if (currentDoiTuong != null) {
            return doiTuongRepo.save(doiTuong);
        }
        return null;
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        doiTuongRepo.deleteById(id);
    }
}
