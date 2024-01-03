package com.andnatkr.server.repositories;

import com.andnatkr.server.domain.entities.RealEstateMgmt;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RealEstateMgmtRepository extends CrudRepository<RealEstateMgmt, Long> {
}
