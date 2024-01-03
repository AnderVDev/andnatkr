package com.andnatkr.server.services;

import com.andnatkr.server.domain.entities.RealEstate;

import java.util.List;

public interface RealEstateService {
    RealEstate save(RealEstate realEstate);

    List<RealEstate> findAll();
}
