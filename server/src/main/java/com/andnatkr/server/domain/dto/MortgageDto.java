package com.andnatkr.server.domain.dto;

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
    private Integer installment_number;
    private String month;
    private Integer year;
    private Integer uf;
    private Integer clp;
    private String comments;
    private Date createdAt;
    private Date updatedAt;
}
