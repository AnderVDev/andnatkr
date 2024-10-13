package com.andnatkr.server.domain.dto.personal_finance;

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
public class Personal_TransactionDto {
    private Long id;
    private UserDto user;
    private String financeStatement;
    private String month;
    private Integer year;
    private String detail;
    private Double amount;
    private String comments;
    private Date createdAt;
    private Date updatedAt;
}
