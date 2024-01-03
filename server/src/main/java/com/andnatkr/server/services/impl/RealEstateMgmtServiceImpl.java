package com.andnatkr.server.services.impl;

import com.andnatkr.server.domain.entities.RealEstateMgmt;
import com.andnatkr.server.repositories.RealEstateMgmtRepository;
import com.andnatkr.server.services.RealEstateMgmtService;
import org.springframework.stereotype.Service;

@Service
public class RealEstateMgmtServiceImpl implements RealEstateMgmtService {
    public final RealEstateMgmtRepository managementRepository;

    public RealEstateMgmtServiceImpl(RealEstateMgmtRepository managementRepository) {
        this.managementRepository = managementRepository;
    }

    @Override
    public RealEstateMgmt save(RealEstateMgmt input) {
        return managementRepository.save(input);
    }
}
