package com.example.hieuthuoc.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "tuong_tac_thuoc")
public class TuongTacThuoc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
    
	private String hoatChat1;
	private String hoatChat2;
	private String coChe;
	private String hauQua;
	private String xuTri;
}
