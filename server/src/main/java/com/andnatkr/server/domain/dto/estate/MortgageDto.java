package com.andnatkr.server.domain.dto.estate;

import com.andnatkr.server.domain.dto.user.UserDto;
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
    private String estate;
    private Integer installment_number;
    private String month;
    private Integer year;
    private Double uf;
    private Double clp;
    private String comments;
    private Integer mgmt_input_id;
    private Date createdAt;
    private Date updatedAt;
}
