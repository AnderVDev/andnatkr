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

    @Override
    public Mortgage partialUpdated(Long id, Mortgage entryEntity) {
        entryEntity.setId(id);
        return repository.findById(id).map(existingEntry -> {
            Optional.ofNullable(entryEntity.getUser()).ifPresent(existingEntry::setUser);
            Optional.ofNullable(entryEntity.getEstate()).ifPresent(existingEntry::setEstate);
            Optional.ofNullable(entryEntity.getInstallment_number()).ifPresent(existingEntry::setInstallment_number);
            Optional.ofNullable(entryEntity.getMonth()).ifPresent(existingEntry::setMonth);
            Optional.ofNullable(entryEntity.getYear()).ifPresent(existingEntry::setYear);
            Optional.ofNullable(entryEntity.getUf()).ifPresent(existingEntry::setUf);
            Optional.ofNullable(entryEntity.getClp()).ifPresent(existingEntry::setClp);
            Optional.ofNullable(entryEntity.getComments()).ifPresent(existingEntry::setComments);
            return repository.save(existingEntry);
        }).orElseThrow(() -> new RuntimeException("Entry Does not Exist"));
    }
}
