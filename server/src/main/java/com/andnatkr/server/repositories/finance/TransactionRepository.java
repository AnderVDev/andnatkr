package com.andnatkr.server.repositories.finance;

import com.andnatkr.server.domain.entities.finance.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}
