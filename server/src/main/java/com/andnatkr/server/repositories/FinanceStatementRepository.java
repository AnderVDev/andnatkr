package com.andnatkr.server.repositories;

import com.andnatkr.server.domain.entities.FinanceStatement;
import org.springframework.data.repository.CrudRepository;

public interface FinanceStatementRepository extends CrudRepository<FinanceStatement, Integer> {
}
