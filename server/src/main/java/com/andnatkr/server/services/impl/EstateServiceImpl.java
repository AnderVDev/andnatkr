package com.andnatkr.server.services.impl;

import com.andnatkr.server.domain.entities.Estate;
import com.andnatkr.server.repositories.EstateRepository;
import com.andnatkr.server.services.EstateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class EstateServiceImpl implements EstateService {
    private final EstateRepository repository;

    @Override
    public Estate save(Estate estate) {
        return repository.save(estate);
    }

    @Override
    public List<Estate> findAll() {
        return StreamSupport.stream(
                repository
                        .findAll()
                        .spliterator(),
                false
        ).collect(Collectors.toList());
    }

    @Override
    public Optional<Estate> findOne(Integer id) {
        return repository.findById(id);
    }

    @Override
    public boolean isExists(Integer id) {
        return repository.existsById(id);
    }
}
