package com.andnatkr.server.domain.dto.estate;

import com.andnatkr.server.domain.auth.Token;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EstateDto {
    private Integer id;
    private Integer dep_number;
    private Double leasing_price;
    private String description;
    private String address;
    private List<String> comments;
}
