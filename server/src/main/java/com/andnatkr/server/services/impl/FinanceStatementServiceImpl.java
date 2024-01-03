package com.andnatkr.server.services.impl;

import com.andnatkr.server.domain.entities.FinanceStatement;
import com.andnatkr.server.repositories.FinanceStatementsRepository;
import com.andnatkr.server.services.FinanceStatementService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class FinanceStatementServiceImpl implements FinanceStatementService {
    private final FinanceStatementsRepository financeStatementsRepository;

    public FinanceStatementServiceImpl(FinanceStatementsRepository financeStatementsRepository) {
        this.financeStatementsRepository = financeStatementsRepository;
    }

    @Override
    public FinanceStatement save(FinanceStatement financeStatement) {
        return financeStatementsRepository.save(financeStatement);
    }

    @Override
    public List<FinanceStatement> findAll() {
        return StreamSupport.stream(
                financeStatementsRepository
                        .findAll()
                        .spliterator(),
                false
        ).collect(Collectors.toList());
    }
}
