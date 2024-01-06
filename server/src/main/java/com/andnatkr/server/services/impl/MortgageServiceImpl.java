package com.andnatkr.server.services.impl;

import com.andnatkr.server.domain.entities.Mortgage;
import com.andnatkr.server.repositories.MortgageRepository;
import com.andnatkr.server.services.MortgageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class MortgageServiceImpl implements MortgageService {
    private final MortgageRepository mortgageRepository;

    @Override
    public Mortgage save(Mortgage mortgageEntity) {
        return mortgageRepository.save(mortgageEntity);
    }

    @Override
    public List<Mortgage> findAll() {
        return StreamSupport.stream(
                mortgageRepository
                        .findAll()
                        .spliterator(),
                false
        ).collect(Collectors.toList());
    }
}
