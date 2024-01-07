package com.andnatkr.server.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MortgageDto {
    private Long id;
    private UserDto user;
    private EstateDto realEstate;
    private Integer installment_number;
    private String month;
    private Integer year;
    private Double uf;
    private Double clp;
    private String comments;
    private Date createdAt;
    private Date updatedAt;
}
