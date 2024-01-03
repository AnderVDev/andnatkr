package com.andnatkr.server.services.impl;

import com.andnatkr.server.domain.entities.FinanceStatement;
import com.andnatkr.server.repositories.FinanceStatementRepository;
import com.andnatkr.server.services.FinanceStatementService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class FinanceStatementServiceImpl implements FinanceStatementService {
    private final FinanceStatementRepository financeStatementRepository;

    public FinanceStatementServiceImpl(FinanceStatementRepository financeStatementRepository) {
        this.financeStatementRepository = financeStatementRepository;
    }

    @Override
    public FinanceStatement save(FinanceStatement financeStatement) {
        return financeStatementRepository.save(financeStatement);
    }

    @Override
    public List<FinanceStatement> findAll() {
        return StreamSupport.stream(
                financeStatementRepository
                        .findAll()
                        .spliterator(),
                false
        ).collect(Collectors.toList());
    }
}
