package com.andnatkr.server.services.impl;

import com.andnatkr.server.domain.entities.Estate;
import com.andnatkr.server.repositories.EstateRepository;
import com.andnatkr.server.services.EstateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class EstateServiceImpl implements EstateService {
    private final EstateRepository estateRepository;

    @Override
    public Estate save(Estate estate) {
        return estateRepository.save(estate);
    }

    @Override
    public List<Estate> findAll() {
        return StreamSupport.stream(
                estateRepository
                        .findAll()
                        .spliterator(),
                false
        ).collect(Collectors.toList());
    }
}
