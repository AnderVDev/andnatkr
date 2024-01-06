package com.andnatkr.server.domain.dto;

import com.andnatkr.server.domain.entities.RealEstateMgmt;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RealEstateDto {
    private Integer id;
    private Integer dep_number;
    private String description;
}
