package com.andnatkr.server.mappers.impl;

import com.andnatkr.server.domain.dto.EstateMgmtDto;
import com.andnatkr.server.domain.entities.EstateMgmt;
import com.andnatkr.server.mappers.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class EstateMgmtMapper implements Mapper<EstateMgmt, EstateMgmtDto> {
    public final ModelMapper modelMapper;

    public EstateMgmtMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public EstateMgmtDto mapTo(EstateMgmt estateMgmt) {
        return modelMapper.map(estateMgmt, EstateMgmtDto.class);
    }

    @Override
    public EstateMgmt mapFrom(EstateMgmtDto estateMgmtDto) {
        return modelMapper.map(estateMgmtDto, EstateMgmt.class);
    }
}
