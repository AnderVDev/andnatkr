package com.andnatkr.server.mappers.impl;

import com.andnatkr.server.domain.dto.RealEstateDto;
import com.andnatkr.server.domain.entities.RealEstate;
import com.andnatkr.server.mappers.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class RealEstateMapper implements Mapper<RealEstate, RealEstateDto> {
    private  final ModelMapper modelMapper;

    public RealEstateMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public RealEstateDto mapTo(RealEstate realEstate) {
        return modelMapper.map(realEstate, RealEstateDto.class);
    }

    @Override
    public RealEstate mapFrom(RealEstateDto realEstateDto) {
        return modelMapper.map(realEstateDto, RealEstate.class);
    }
}
