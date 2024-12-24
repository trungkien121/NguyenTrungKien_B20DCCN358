package com.example.hieuthuoc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.hieuthuoc.dto.NhaSanXuatDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.entity.NhaSanXuat;
import com.example.hieuthuoc.service.NhaSanXuatService;

@RestController
@RequestMapping("/nhasanxuat")
public class NhaSanXuatController {

    @Autowired
    private NhaSanXuatService nhaSanXuatService;

    // Lấy danh sách tất cả nhà sản xuất
    @GetMapping("/list")
    public ResponseDTO<List<NhaSanXuat>> getAll() {
        return nhaSanXuatService.getAll();
    }
    
	@GetMapping("/search_by_ten_nha_san_xuat")
	public ResponseDTO<List<NhaSanXuat>> searchByTenNhaSanXuat(@RequestParam("tenNhaSanXuat") String tenNhaSanXuat) {
		return nhaSanXuatService.searchByTenNhaSanXuat(tenNhaSanXuat);
	}


    // Tạo mới nhà sản xuất
    @PostMapping("/create")
    public ResponseDTO<NhaSanXuat> create(@RequestBody NhaSanXuatDTO nhaSanXuatDTO) {
        return nhaSanXuatService.create(nhaSanXuatDTO);
    }

    // Cập nhật thông tin nhà sản xuất
    @PutMapping("/update")
    public ResponseDTO<NhaSanXuat> update(@RequestBody NhaSanXuatDTO nhaSanXuatDTO) {
        return nhaSanXuatService.update(nhaSanXuatDTO);
    }

    // Xóa nhà sản xuất theo ID
    @DeleteMapping("/delete")
    public ResponseDTO<Void> delete(@RequestParam("id") Integer id) {
        return nhaSanXuatService.delete(id);
    }
}
