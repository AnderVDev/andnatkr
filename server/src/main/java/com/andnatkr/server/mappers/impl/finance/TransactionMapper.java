package com.andnatkr.server.mappers.impl.finance;

import com.andnatkr.server.domain.dto.finance.TransactionDto;
import com.andnatkr.server.domain.entities.finance.Transaction;
import com.andnatkr.server.mappers.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class TransactionMapper implements Mapper<Transaction, TransactionDto> {

    private final ModelMapper modelMapper;

    public TransactionMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public TransactionDto mapTo(Transaction transaction) {
        return modelMapper.map(transaction, TransactionDto.class);
    }

    @Override
    public Transaction mapFrom(TransactionDto transactionDto) {
        return modelMapper.map(transactionDto, Transaction.class);
    }
}
