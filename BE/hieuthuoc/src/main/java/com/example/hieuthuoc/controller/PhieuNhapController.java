package com.example.hieuthuoc.controller;

import com.example.hieuthuoc.dto.*;
import com.example.hieuthuoc.entity.PhieuNhap;
import com.example.hieuthuoc.service.PhieuNhapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/phieunhap")
public class PhieuNhapController {

    @Autowired
    private PhieuNhapService phieuNhapService;

    // Lấy danh sách phiếu nhập với tìm kiếm theo tên nhà cung cấp và phân trang
    @PostMapping("/search")
    public ResponseEntity<ResponseDTO<PageDTO<List<PhieuNhap>>>> search(@RequestBody SearchDTO searchDTO) {
        return ResponseEntity.ok(phieuNhapService.search(searchDTO));
    }

    // Lấy thông tin phiếu nhập theo ID
    @GetMapping("/get")
    public ResponseEntity<ResponseDTO<PhieuNhap>> getById(@RequestParam Integer id) {
        return ResponseEntity.ok(phieuNhapService.getById(id));
    }

    // Tạo phiếu nhập mới
    @PostMapping("/create")
    public ResponseEntity<ResponseDTO<PhieuNhap>> create(@RequestBody PhieuNhapDTO phieuNhapDTO) {
        return ResponseEntity.ok(phieuNhapService.create(phieuNhapDTO));
    }

    // Cập nhật thông tin phiếu nhập
    @PutMapping("/update")
    public ResponseEntity<ResponseDTO<PhieuNhap>> update(@RequestBody PhieuNhapDTO phieuNhapDTO) {
        return ResponseEntity.ok(phieuNhapService.update(phieuNhapDTO));
    }

    // Xóa phiếu nhập theo ID
    @DeleteMapping("/delete")
    public ResponseEntity<ResponseDTO<Void>> delete(@RequestParam Integer id) {
        return ResponseEntity.ok(phieuNhapService.delete(id));
    }
}
