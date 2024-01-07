package com.andnatkr.server.services;

import com.andnatkr.server.domain.entities.Estate;

import java.util.List;

public interface EstateService {
    Estate save(Estate estate);

    List<Estate> findAll();
}
