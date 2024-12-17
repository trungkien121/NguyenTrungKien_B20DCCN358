package com.example.hieuthuoc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hieuthuoc.dto.PageDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.dto.SearchTonKhoDTO;
import com.example.hieuthuoc.dto.TonKhoDTO;
import com.example.hieuthuoc.entity.TonKho;
import com.example.hieuthuoc.service.TonKhoService;

@RestController
@RequestMapping("/tonkho")
public class TonKhoController {

    @Autowired
    private TonKhoService tonKhoService;

    // Cập nhật tồn kho
    @PutMapping("/update")
    public ResponseDTO<TonKho> updateTonKho(@RequestBody TonKhoDTO tonKhoDTO) {
        return tonKhoService.update(tonKhoDTO);
    }
    
    @PostMapping("/search")
    public ResponseDTO<PageDTO<List<TonKho>>> search(@RequestBody SearchTonKhoDTO searchTonKhoDTO) {
        return tonKhoService.search(searchTonKhoDTO);
    }

}
