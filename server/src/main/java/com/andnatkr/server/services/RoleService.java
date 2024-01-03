package com.andnatkr.server.services;

import com.andnatkr.server.domain.entities.Role;

import java.util.List;

public interface RoleService {
    Role save(Role role);

    List<Role> findAll();
}
