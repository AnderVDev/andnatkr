package com.andnatkr.server.domain.dto;

import com.andnatkr.server.domain.entities.RealEstate;
import com.andnatkr.server.domain.entities.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MortgageDto {
    private Long id;
    private User user;
    private RealEstate realEstate;
    private Integer installment_number;
    private String month;
    private Integer year;
    private Double uf;
    private Double clp;
    private String comments;
    private Date createdAt;
    private Date updatedAt;
}
