package com.andnatkr.server.mappers.impl.personal_finance;

import com.andnatkr.server.domain.dto.personal_finance.Personal_TransactionDto;
import com.andnatkr.server.domain.entities.personal_finance.Personal_Transaction;
import com.andnatkr.server.mappers.Mapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class Personal_TransactionMapper implements Mapper<Personal_Transaction, Personal_TransactionDto> {

    private final ModelMapper modelMapper;

    @Override
    public Personal_TransactionDto mapTo(Personal_Transaction personalTransaction) {
        return modelMapper.map(personalTransaction, Personal_TransactionDto.class);
    }

    @Override
    public Personal_Transaction mapFrom(Personal_TransactionDto personalTransactionDto) {
        return modelMapper.map(personalTransactionDto, Personal_Transaction.class);
    }
}
