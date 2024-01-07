package com.andnatkr.server.services;

import com.andnatkr.server.domain.entities.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserService
{
    User save(User user);

    List<User> findAll();

    Optional<User> findOne(UUID id);
}
