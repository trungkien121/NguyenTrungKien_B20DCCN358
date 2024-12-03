package com.example.hieuthuoc.entity;

import java.util.List;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "gio_hang")
@EntityListeners(AuditingEntityListener.class)
@EqualsAndHashCode(callSuper = true)
public class GioHang extends TimeAuditable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "nguoi_dung_id")
    private NguoiDung khachHang;

    @OneToMany(mappedBy = "gioHang", cascade = CascadeType.ALL)
    List<ChiTietGioHang> chiTietGioHangs;

}


