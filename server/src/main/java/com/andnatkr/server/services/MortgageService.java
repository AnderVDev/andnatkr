package com.andnatkr.server.services;

import com.andnatkr.server.domain.entities.Mortgage;

import java.util.List;

public interface MortgageService {
    Mortgage save(Mortgage mortgageEntity);

    List<Mortgage> findAll();
}
