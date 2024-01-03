package com.andnatkr.server.mappers.impl;

import com.andnatkr.server.domain.dto.FinanceStatementDto;
import com.andnatkr.server.domain.entities.FinanceStatement;
import com.andnatkr.server.mappers.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class FinanceStatementMapper implements Mapper<FinanceStatement, FinanceStatementDto> {
    private final ModelMapper modelMapper;

    public FinanceStatementMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public FinanceStatementDto mapTo(FinanceStatement financeStatement) {
        return modelMapper.map(financeStatement, FinanceStatementDto.class);
    }

    @Override
    public FinanceStatement mapFrom(FinanceStatementDto financeStatementDto) {
        return modelMapper.map(financeStatementDto, FinanceStatement.class);
    }
}
