package com.andnatkr.server.domain.dto;

import com.andnatkr.server.domain.entities.RealEstate;
import com.andnatkr.server.domain.entities.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class RealEstateMgmtDto {

    private Long id;
    private User user;
    private String financeStatement;
    private RealEstate realEstate;
    private Integer amount;
    private String month;
    private Integer year;
    private String detail;
    private String comments;
    private Date createdAt;
    private Date updatedAt;
}
