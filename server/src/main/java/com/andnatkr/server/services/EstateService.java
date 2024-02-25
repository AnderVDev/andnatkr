package com.andnatkr.server.services;

import com.andnatkr.server.domain.entities.estate.Estate;

import java.util.List;
import java.util.Optional;

public interface EstateService {
    Estate save(Estate estate);

    List<Estate> findAll();

    Optional<Estate> findOne(Integer id);

    boolean isExists(Integer id);


    Estate partialUpdated(Integer id, Estate estateEntity);

    void delete(Integer id);
}
