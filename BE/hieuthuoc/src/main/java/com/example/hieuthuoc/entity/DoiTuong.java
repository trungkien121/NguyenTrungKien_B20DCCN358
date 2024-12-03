package com.example.hieuthuoc.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "doi_tuong")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class DoiTuong {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @EqualsAndHashCode.Include
    private String tenDoiTuong;
    private String moTa;

    // getters and setters
}