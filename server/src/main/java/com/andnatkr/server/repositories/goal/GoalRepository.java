package com.andnatkr.server.repositories.goal;

import com.andnatkr.server.domain.entities.goal.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {
}
