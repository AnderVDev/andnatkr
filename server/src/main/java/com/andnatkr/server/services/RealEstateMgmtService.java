package com.andnatkr.server.services;

import com.andnatkr.server.domain.entities.RealEstateMgmt;

import java.util.List;

public interface RealEstateMgmtService {
    RealEstateMgmt save(RealEstateMgmt input);

    List<RealEstateMgmt> findAll();
}
