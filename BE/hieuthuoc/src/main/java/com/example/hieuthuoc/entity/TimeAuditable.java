package com.example.hieuthuoc.entity;

import java.util.Date;



import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Data
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class TimeAuditable {
	@CreatedDate 
	@Temporal(TemporalType.TIMESTAMP)
	@Column(updatable = false)
	private Date createdAt;
	
	@LastModifiedDate
	private Date updateAt;
}
