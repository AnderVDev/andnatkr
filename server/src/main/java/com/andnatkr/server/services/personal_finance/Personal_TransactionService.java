package com.andnatkr.server.services.personal_finance;

import com.andnatkr.server.domain.entities.personal_finance.Personal_Transaction;

import java.util.List;
import java.util.Optional;

public interface Personal_TransactionService {
    Personal_Transaction save(Personal_Transaction input);

    List<Personal_Transaction> findAll();

    Optional<Personal_Transaction> findOne(Long id);

    boolean isExists(Long id);

    Personal_Transaction partialUpdated(Long id, Personal_Transaction inputEntity);

    void delete(Long id);
}
