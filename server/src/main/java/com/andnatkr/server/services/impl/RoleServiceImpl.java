package com.andnatkr.server.services.impl;

import com.andnatkr.server.domain.entities.Role;
import com.andnatkr.server.repositories.RoleRepository;
import com.andnatkr.server.services.RoleService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
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

    @Override
    public Optional<Role> findOne(Integer id) {
        return roleRepository.findById(id);
    }

    @Override
    public boolean isExists(Integer id) {
        return roleRepository.existsById(id);
    }

    @Override
    public Role partialUpdated(Integer id, Role role) {
        role.setId(id);
        return roleRepository.findById(id).map(existingRole ->{
            Optional.ofNullable(role.getDescription()).ifPresent(existingRole::setDescription);
            return roleRepository.save(existingRole);
        }).orElseThrow(() -> new RuntimeException("Role does not Exist"));
    }

    @Override
    public void delete(Integer id) {
        roleRepository.deleteById(id);
    }
}
