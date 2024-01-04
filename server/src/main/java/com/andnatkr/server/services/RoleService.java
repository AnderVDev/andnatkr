package com.andnatkr.server.services;

import com.andnatkr.server.domain.entities.Role;

import java.util.List;
import java.util.Optional;

public interface RoleService {
    Role save(Role role);

    List<Role> findAll();

    Optional<Role> findOne(Integer id);

    boolean isExists(Integer id);

    Role partialUpdated(Integer id, Role role);

    void delete(Integer id);
}
