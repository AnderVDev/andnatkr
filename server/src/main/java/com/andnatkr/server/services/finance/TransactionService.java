package com.andnatkr.server.services.finance;

import com.andnatkr.server.domain.entities.finance.Transaction;

import java.util.List;
import java.util.Optional;

public interface TransactionService {
    Transaction save(Transaction input);

    List<Transaction> findAll();

    Optional<Transaction> findOne(Long id);

    boolean isExists(Long id);

    Transaction partialUpdated(Long id, Transaction inputEntity);

    void delete(Long id);
}
