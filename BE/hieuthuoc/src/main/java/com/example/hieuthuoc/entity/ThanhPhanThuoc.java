package com.example.hieuthuoc.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "thanh_phan_thuoc")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class ThanhPhanThuoc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "thuoc_id")
    private Thuoc thuoc;

    @EqualsAndHashCode.Include
    private String tenThanhPhan;
    private String hamLuong;
    private String donVi;
   

    // getters and setters
}