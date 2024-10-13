package com.andnatkr.server.repositories.personal_finance;

import com.andnatkr.server.domain.entities.personal_finance.Personal_Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Personal_TransactionRepository extends JpaRepository<Personal_Transaction, Long> {
}
