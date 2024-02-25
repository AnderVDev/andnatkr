package com.andnatkr.server.repositories.finance;

import com.andnatkr.server.domain.entities.finance.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}
