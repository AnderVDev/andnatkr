package com.andnatkr.server.repositories.estate;

import com.andnatkr.server.domain.entities.estate.Estate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstateRepository extends JpaRepository<Estate, Integer> {
}
