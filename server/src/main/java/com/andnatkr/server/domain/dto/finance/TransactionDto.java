package com.andnatkr.server.domain.dto.finance;

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
public class TransactionDto {

    private Long id;
    private UserDto user;
    private String month;
    private Integer year;
    private String detail;
    private Double amount;
    private String comments;
    private Date createdAt;
    private Date updatedAt;
}
