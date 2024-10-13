package com.andnatkr.server.services.personal_finance.impl;

import com.andnatkr.server.domain.entities.personal_finance.Personal_Transaction;
import com.andnatkr.server.repositories.personal_finance.Personal_TransactionRepository;
import com.andnatkr.server.services.personal_finance.Personal_TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class Personal_TransactionServiceImpl implements Personal_TransactionService {
    private final Personal_TransactionRepository repository;

    @Override
    public Personal_Transaction save(Personal_Transaction input) {
        return repository.save(input);
    }

    @Override
    public List<Personal_Transaction> findAll() {
        return StreamSupport.stream(
                repository
                        .findAll()
                        .spliterator(),
                false
        ).collect(Collectors.toList());
    }

    @Override
    public Optional<Personal_Transaction> findOne(Long id) {
        return repository.findById(id);
    }

    @Override
    public boolean isExists(Long id) {
        return repository.existsById(id);
    }

    @Override
    public Personal_Transaction partialUpdated(Long id, Personal_Transaction inputEntity) {
        inputEntity.setId(id);
        return repository.findById(id).map(existingInput -> {
            Optional.ofNullable(inputEntity.getUser()).ifPresent(existingInput::setUser);
            Optional.ofNullable(inputEntity.getFinanceStatement()).ifPresent(existingInput::setFinanceStatement);
            Optional.ofNullable(inputEntity.getMonth()).ifPresent(existingInput::setMonth);
            Optional.ofNullable(inputEntity.getYear()).ifPresent(existingInput::setYear);
            Optional.ofNullable(inputEntity.getDetail()).ifPresent(existingInput::setDetail);
            Optional.ofNullable(inputEntity.getAmount()).ifPresent(existingInput::setAmount);
            Optional.ofNullable(inputEntity.getComments()).ifPresent(existingInput::setComments);
            return repository.save(existingInput);
        }).orElseThrow(() -> new RuntimeException("Input Does not Exist"));
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
