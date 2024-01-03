package com.andnatkr.server.services.impl;

import com.andnatkr.server.domain.entities.RealEstate;
import com.andnatkr.server.repositories.RealEstatesRepository;
import com.andnatkr.server.services.RealEstateService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class RealEstateServiceImpl implements RealEstateService {
    private final RealEstatesRepository realEstatesRepository;

    public RealEstateServiceImpl(RealEstatesRepository realEstatesRepository) {
        this.realEstatesRepository = realEstatesRepository;
    }

    @Override
    public RealEstate save(RealEstate realEstate) {
        return realEstatesRepository.save(realEstate);
    }

    @Override
    public List<RealEstate> findAll() {
        return StreamSupport.stream(
                realEstatesRepository
                        .findAll()
                        .spliterator(),
                false
        ).collect(Collectors.toList());
    }
}
