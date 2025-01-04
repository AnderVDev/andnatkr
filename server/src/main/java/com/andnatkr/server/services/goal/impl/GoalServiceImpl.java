package com.andnatkr.server.services.goal.impl;

import com.andnatkr.server.domain.entities.goal.Goal;
import com.andnatkr.server.repositories.goal.GoalRepository;
import com.andnatkr.server.services.goal.GoalService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class GoalServiceImpl implements GoalService {
    private final GoalRepository repository;

    @Override
    public Goal save(Goal input) {
        return repository.save(input);
    }

    @Override
    public List<Goal> findAll() {
        return StreamSupport.stream(
                repository
                        .findAll()
                        .spliterator(),
                false
        ).collect(Collectors.toList());
    }

    @Override
    public Optional<Goal> findOne(Long id) {
        return repository.findById(id);
    }

    @Override
    public boolean isExists(Long id) {
       return repository.existsById(id);
    }

    @Override
    public Goal partialUpdated(Long id, Goal inputEntity) {
        inputEntity.setId(id);
        return repository.findById(id).map(existingInput -> {
            Optional.ofNullable(inputEntity.getUser()).ifPresent(existingInput::setUser);
            Optional.ofNullable(inputEntity.getObjective()).ifPresent(existingInput::setObjective);
            Optional.ofNullable(inputEntity.getTarget()).ifPresent(existingInput::setTarget);
            Optional.ofNullable(inputEntity.getCurrent()).ifPresent(existingInput::setCurrent);
            Optional.ofNullable(inputEntity.getType()).ifPresent(existingInput::setType);
            return repository.save(existingInput);
        }).orElseThrow(() -> new RuntimeException("Input Does not Exist"));
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
