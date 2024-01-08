package com.andnatkr.server.services.impl;

import com.andnatkr.server.domain.entities.Mortgage;
import com.andnatkr.server.repositories.MortgageRepository;
import com.andnatkr.server.services.MortgageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class MortgageServiceImpl implements MortgageService {
    private final MortgageRepository repository;

    @Override
    public Mortgage save(Mortgage mortgageEntity) {
        return repository.save(mortgageEntity);
    }

    @Override
    public List<Mortgage> findAll() {
        return StreamSupport.stream(
                repository
                        .findAll()
                        .spliterator(),
                false
        ).collect(Collectors.toList());
    }

    @Override
    public Optional<Mortgage> findOne(Long id) {
        return repository.findById(id);
    }

    @Override
    public boolean isExists(Long id) {
        return repository.existsById(id);
    }
}
