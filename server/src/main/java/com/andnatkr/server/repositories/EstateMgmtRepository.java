package com.andnatkr.server.repositories;

import com.andnatkr.server.domain.entities.EstateMgmt;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstateMgmtRepository extends CrudRepository<EstateMgmt, Long> {
}
