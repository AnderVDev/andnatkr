package com.andnatkr.server.mappers.impl;

import com.andnatkr.server.domain.dto.EstateDto;
import com.andnatkr.server.domain.entities.Estate;
import com.andnatkr.server.mappers.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class EstateMapper implements Mapper<Estate, EstateDto> {
    private  final ModelMapper modelMapper;

    public EstateMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public EstateDto mapTo(Estate estate) {
        return modelMapper.map(estate, EstateDto.class);
    }

    @Override
    public Estate mapFrom(EstateDto estateDto) {
        return modelMapper.map(estateDto, Estate.class);
    }
}
