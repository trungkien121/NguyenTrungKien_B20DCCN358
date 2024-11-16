package com.example.hieuthuoc.service;

import com.example.hieuthuoc.dto.HoaDonDTO;
import com.example.hieuthuoc.entity.HoaDon;
import com.example.hieuthuoc.repository.HoaDonRepo;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

public interface HoaDonService {
    List<HoaDon> getAllHoaDons();
    Optional<HoaDon> getHoaDonById(Integer id);
    HoaDon create(HoaDonDTO hoaDonDTO);
    HoaDon update(HoaDonDTO hoaDonDTO);
    void delete(Integer id);
}

@Service
class HoaDonServiceImpl implements HoaDonService {

    @Autowired
    private HoaDonRepo hoaDonRepo;

    ModelMapper modelMapper = new ModelMapper();

    @Override
    public List<HoaDon> getAllHoaDons() {
        return hoaDonRepo.findAll();
    }

    @Override
    public Optional<HoaDon> getHoaDonById(Integer id) {
        return hoaDonRepo.findById(id);
    }

    @Override
    @Transactional
    public HoaDon create(HoaDonDTO hoaDonDTO) {
        HoaDon hoaDon = modelMapper.map(hoaDonDTO, HoaDon.class);
        return hoaDonRepo.save(hoaDon);
    }

    @Override
    @Transactional
    public HoaDon update(HoaDonDTO hoaDonDTO) {
        HoaDon hoaDon = modelMapper.map(hoaDonDTO, HoaDon.class);
        HoaDon currentHoaDon = hoaDonRepo.findById(hoaDon.getId()).orElse(null);
        if (currentHoaDon != null) {
            return hoaDonRepo.save(hoaDon);
        }
        return null;
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        hoaDonRepo.deleteById(id);
    }
}
