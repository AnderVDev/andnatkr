package com.andnatkr.server.repositories;

import com.andnatkr.server.domain.entities.estate.Mortgage;
import org.springframework.data.repository.CrudRepository;

public interface MortgageRepository extends CrudRepository<Mortgage, Long> {
}
