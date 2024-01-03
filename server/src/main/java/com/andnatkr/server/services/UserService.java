package com.andnatkr.server.services;

import com.andnatkr.server.domain.entities.User;

import java.util.List;

public interface UserService
{
    User save(User user);

    List<User> findAll();
}
