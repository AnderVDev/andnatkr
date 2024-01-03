package com.andnatkr.server.services.impl;

import com.andnatkr.server.domain.entities.Role;
import com.andnatkr.server.repositories.RoleRepository;
import com.andnatkr.server.services.RoleService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Role save(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public List<Role> findAll() {
        return StreamSupport.stream(
                roleRepository
                        .findAll()
                        .spliterator(),
                false)
                .collect(Collectors.toList());
    }
}
