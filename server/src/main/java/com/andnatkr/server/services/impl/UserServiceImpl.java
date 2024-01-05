package com.andnatkr.server.services.impl;

import com.andnatkr.server.domain.entities.User;
import com.andnatkr.server.repositories.UserRepository;
import com.andnatkr.server.services.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> findAll() {
        return StreamSupport.stream(
                userRepository
                        .findAll()
                        .spliterator(),
                false)
                .collect(Collectors.toList());
    }
}
