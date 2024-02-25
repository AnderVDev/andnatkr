package com.andnatkr.server.mappers.impl.estate;

import com.andnatkr.server.domain.dto.estate.MortgageDto;
import com.andnatkr.server.domain.entities.estate.Mortgage;
import com.andnatkr.server.mappers.Mapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MortgageMapper implements Mapper<Mortgage, MortgageDto> {
    private final ModelMapper modelMapper;

    @Override
    public MortgageDto mapTo(Mortgage mortgage) {
        return modelMapper.map(mortgage, MortgageDto.class);
    }

    @Override
    public Mortgage mapFrom(MortgageDto mortgageDto) {
        return modelMapper.map(mortgageDto, Mortgage.class);
    }
}
