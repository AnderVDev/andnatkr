package com.andnatkr.server.services.impl;

import com.andnatkr.server.domain.entities.User;
import com.andnatkr.server.repositories.UserRepository;
import com.andnatkr.server.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

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

    @Override
    public Optional<User> findOne(UUID id) {
        return userRepository.findById(id);
    }

    @Override
    public boolean isExists(UUID id) {
        return userRepository.existsById(id);
    }

    @Override
    public User partialUpdated(UUID id, User userEntity) {
        return null;
    }
}
