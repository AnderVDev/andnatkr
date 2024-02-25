package com.andnatkr.server.repositories.estate;

import com.andnatkr.server.domain.entities.estate.Estate;
import org.springframework.data.repository.CrudRepository;

public interface EstateRepository extends CrudRepository<Estate, Integer> {
}
