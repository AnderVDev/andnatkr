package com.andnatkr.server.services.goal;

import com.andnatkr.server.domain.entities.goal.Goal;

import java.util.List;
import java.util.Optional;

public interface GoalService {
    Goal save(Goal input);

    List<Goal> findAll();

    Optional<Goal> findOne(Long id);

    boolean isExists(Long id);

    Goal partialUpdated(Long id, Goal inputEntity);

    void delete(Long id);
}
