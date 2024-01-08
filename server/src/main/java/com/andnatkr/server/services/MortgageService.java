package com.andnatkr.server.services;

import com.andnatkr.server.domain.entities.Mortgage;

import java.util.List;
import java.util.Optional;

public interface MortgageService {
    Mortgage save(Mortgage mortgageEntity);

    List<Mortgage> findAll();

    Optional<Mortgage> findOne(Long id);

    boolean isExists(Long id);


    Mortgage partialUpdated(Long id, Mortgage entryEntity);
}
