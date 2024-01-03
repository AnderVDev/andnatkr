package com.andnatkr.server.mappers.impl;

import com.andnatkr.server.domain.dto.RealEstateMgmtDto;
import com.andnatkr.server.domain.entities.RealEstateMgmt;
import com.andnatkr.server.mappers.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class RealEstateMgmtMapper implements Mapper<RealEstateMgmt, RealEstateMgmtDto> {
    public final ModelMapper modelMapper;

    public RealEstateMgmtMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public RealEstateMgmtDto mapTo(RealEstateMgmt realEstateMgmt) {
        return modelMapper.map(realEstateMgmt, RealEstateMgmtDto.class);
    }

    @Override
    public RealEstateMgmt mapFrom(RealEstateMgmtDto realEstateMgmtDto) {
        return modelMapper.map(realEstateMgmtDto, RealEstateMgmt.class);
    }
}
