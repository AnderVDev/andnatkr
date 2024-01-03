package com.andnatkr.server.services;

import com.andnatkr.server.domain.entities.FinanceStatement;

import java.util.List;

public interface FinanceStatementService {
    FinanceStatement save(FinanceStatement financeStatement);

    List<FinanceStatement> findAll();
}
