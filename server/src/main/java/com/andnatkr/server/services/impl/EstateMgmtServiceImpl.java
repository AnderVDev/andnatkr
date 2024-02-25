package com.andnatkr.server.services.impl;

import com.andnatkr.server.domain.entities.estate.EstateMgmt;
import com.andnatkr.server.repositories.EstateMgmtRepository;
import com.andnatkr.server.services.EstateMgmtService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class EstateMgmtServiceImpl implements EstateMgmtService {
    public final EstateMgmtRepository repository;


    @Override
    public EstateMgmt save(EstateMgmt input) {

        return repository.save(input);
    }

    @Override
    public List<EstateMgmt> findAll() {
        return StreamSupport.stream(
                repository
                        .findAll()
                        .spliterator(),
                false
        ).collect(Collectors.toList());
    }

    @Override
    public Optional<EstateMgmt> findOne(Long id) {
        return repository.findById(id);
    }

    @Override
    public boolean isExists(Long id) {
        return repository.existsById(id);
    }

    @Override
    public EstateMgmt partialUpdated(Long id, EstateMgmt inputEntity) {
        inputEntity.setId(id);
        return repository.findById(id).map(existingInput -> {
            Optional.ofNullable(inputEntity.getUser()).ifPresent(existingInput::setUser);
            Optional.ofNullable(inputEntity.getFinanceStatement()).ifPresent(existingInput::setFinanceStatement);
            Optional.ofNullable(inputEntity.getEstate()).ifPresent(existingInput::setEstate);
            Optional.ofNullable(inputEntity.getAmount()).ifPresent(existingInput::setAmount);
            Optional.ofNullable(inputEntity.getMonth()).ifPresent(existingInput::setMonth);
            Optional.ofNullable(inputEntity.getYear()).ifPresent(existingInput::setYear);
            Optional.ofNullable(inputEntity.getDetail()).ifPresent(existingInput::setDetail);
            Optional.ofNullable(inputEntity.getComments()).ifPresent(existingInput::setComments);
            return repository.save(existingInput);
        }).orElseThrow(() -> new RuntimeException("Input Does not Exist"));
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

}
