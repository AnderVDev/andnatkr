package com.andnatkr.server.services.estate.impl;

import com.andnatkr.server.domain.entities.estate.Estate;
import com.andnatkr.server.repositories.estate.EstateRepository;
import com.andnatkr.server.services.estate.EstateService;
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

    @Override
    public Estate partialUpdated(Integer id, Estate estateEntity) {
        estateEntity.setId(id);
        return repository.findById(id).map(existingEstate -> {
            Optional.ofNullable(estateEntity.getDep_number()).ifPresent(existingEstate::setDep_number);
            Optional.ofNullable(estateEntity.getLeasing_price()).ifPresent(existingEstate::setLeasing_price);
            Optional.ofNullable(estateEntity.getDescription()).ifPresent(existingEstate::setDescription);
            Optional.ofNullable(estateEntity.getAddress()).ifPresent(existingEstate::setAddress);
            Optional.ofNullable(estateEntity.getComments()).ifPresent(existingEstate::setComments);
            return repository.save(existingEstate);
        }).orElseThrow(() -> new RuntimeException("Estate Does not Exist"));
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
