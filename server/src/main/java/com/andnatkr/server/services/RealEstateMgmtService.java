package com.andnatkr.server.services;

import com.andnatkr.server.domain.dto.RealEstateMgmtDto;
import com.andnatkr.server.domain.entities.RealEstateMgmt;

import java.util.List;
import java.util.Optional;

public interface RealEstateMgmtService {
    RealEstateMgmt save(RealEstateMgmt input);

    List<RealEstateMgmt> findAll();

    Optional<RealEstateMgmt> findOne(Long id);

    boolean isExists(Long id);

    RealEstateMgmt partialUpdated(Long id, RealEstateMgmt inputEntity);

    void delete(Long id);

}
