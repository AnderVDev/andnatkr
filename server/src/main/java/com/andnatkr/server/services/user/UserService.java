package com.andnatkr.server.services.user;

import com.andnatkr.server.domain.entities.user.User;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserService
{
    User save(User user);

    List<User> findAll();

    Optional<User> findOne(UUID id);

    boolean isExists(UUID id);

    User partialUpdated(UUID id, User userEntity);

    void delete(UUID id);
}
