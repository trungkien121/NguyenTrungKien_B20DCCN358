package com.example.hieuthuoc.controller;

import com.example.hieuthuoc.dto.PageDTO;
import com.example.hieuthuoc.dto.ResponseDTO;
import com.example.hieuthuoc.dto.SearchDTO;
import com.example.hieuthuoc.dto.ThongBaoDTO;
import com.example.hieuthuoc.entity.ThongBao;
import com.example.hieuthuoc.service.ThongBaoService;

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


@RestController
@RequestMapping("/thongbao")
public class ThongBaoController {

    @Autowired
    private ThongBaoService thongBaoService;

    // Endpoint để lấy thông báo theo id người dùng với phân trang và tìm kiếm
    @PostMapping("/list")
    public ResponseDTO<PageDTO<List<ThongBao>>> getByNguoiDungId(@RequestBody SearchDTO searchDTO) {
        return thongBaoService.getByNguoiDungId(searchDTO);
    }
    
    @PostMapping("/search")
    public ResponseDTO<PageDTO<List<ThongBao>>> searchByLoaiThongBao(@RequestBody SearchDTO searchDTO) {
        return thongBaoService.getByLoaiThongBao(searchDTO);
    }

    // Endpoint để lấy thông báo theo id
    @GetMapping("/get")
    public ResponseDTO<ThongBao> getById(@RequestParam Integer id) {
        return thongBaoService.getById(id);
    }

    // Endpoint để tạo thông báo mới
    @PostMapping("/create")
    public ResponseDTO<ThongBao> create(@RequestBody ThongBaoDTO thongBaoDTO) {
        return thongBaoService.create(thongBaoDTO);
    }

    // Endpoint để cập nhật thông báo
    @PutMapping("/update")
    public ResponseDTO<ThongBao> update(@RequestBody ThongBaoDTO thongBaoDTO) {
        return thongBaoService.update(thongBaoDTO);
    }

    // Endpoint để xóa thông báo
    @DeleteMapping("/delete")
    public ResponseDTO<Void> delete(@RequestParam Integer id) {
        return thongBaoService.delete(id);
    }
}
