package com.andnatkr.server.repositories;

import com.andnatkr.server.domain.entities.Estate;
import org.springframework.data.repository.CrudRepository;

public interface EstateRepository extends CrudRepository<Estate, Integer> {
}
