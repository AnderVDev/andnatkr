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
public class EstateMgmtDto {

    private Long id;
    private UserDto user;
    private String financeStatement;
    private EstateDto estate;
    private Integer amount;
    private String month;
    private Integer year;
    private String detail;
    private String comments;
    private Date createdAt;
    private Date updatedAt;
}
