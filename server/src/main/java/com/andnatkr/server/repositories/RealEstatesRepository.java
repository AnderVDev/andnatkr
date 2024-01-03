package com.andnatkr.server.repositories;

import com.andnatkr.server.domain.entities.RealEstate;
import org.springframework.data.repository.CrudRepository;

public interface RealEstatesRepository extends CrudRepository<RealEstate, Integer> {
}
