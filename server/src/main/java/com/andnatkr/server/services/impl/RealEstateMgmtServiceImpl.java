package com.andnatkr.server.services.impl;

import com.andnatkr.server.domain.entities.RealEstateMgmt;
import com.andnatkr.server.repositories.RealEstateMgmtRepository;
import com.andnatkr.server.services.RealEstateMgmtService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class RealEstateMgmtServiceImpl implements RealEstateMgmtService {
    public final RealEstateMgmtRepository mgmtRepository;

    public RealEstateMgmtServiceImpl(RealEstateMgmtRepository mgmtRepository) {
        this.mgmtRepository = mgmtRepository;
    }

    @Override
    public RealEstateMgmt save(RealEstateMgmt input) {
        return mgmtRepository.save(input);
    }

    @Override
    public List<RealEstateMgmt> findAll() {
        return StreamSupport.stream(
                mgmtRepository
                        .findAll()
                        .spliterator(),
                false
        ).collect(Collectors.toList());
    }

    @Override
    public Optional<RealEstateMgmt> findOne(Long id) {
        return mgmtRepository.findById(id);
    }

    @Override
    public boolean isExists(Long id) {
        return mgmtRepository.existsById(id);
    }
}
