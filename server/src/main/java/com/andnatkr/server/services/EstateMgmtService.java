package com.andnatkr.server.services;

import com.andnatkr.server.domain.entities.EstateMgmt;

import java.util.List;
import java.util.Optional;

public interface EstateMgmtService {
    EstateMgmt save(EstateMgmt input);

    List<EstateMgmt> findAll();

    Optional<EstateMgmt> findOne(Long id);

    boolean isExists(Long id);

    EstateMgmt partialUpdated(Long id, EstateMgmt inputEntity);

    void delete(Long id);

}
