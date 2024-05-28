package com.andnatkr.server.services.user.impl;

import com.andnatkr.server.domain.entities.user.User;
import com.andnatkr.server.repositories.user.UserRepository;
import com.andnatkr.server.services.user.UserService;
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
        userEntity.setId(id);
        return userRepository.findById(id).map(existingUser -> {
            Optional.ofNullable(userEntity.getFirstName()).ifPresent(existingUser::setFirstName);
            Optional.ofNullable(userEntity.getLastName()).ifPresent(existingUser::setLastName);
            Optional.ofNullable(userEntity.getEmail()).ifPresent(existingUser::setEmail);
            Optional.ofNullable(userEntity.getPassword()).ifPresent(existingUser::setPassword);
            Optional.ofNullable(userEntity.getRole()).ifPresent(existingUser::setRole);
//            Optional.ofNullable(userEntity.getNameAvatar()).ifPresent(existingUser::setNameAvatar);
//            Optional.ofNullable(userEntity.getDescription()).ifPresent(existingUser::setDescription);
            return  userRepository.save(existingUser);
        }).orElseThrow(() -> new RuntimeException("User Does not Exist"));
    }

    @Override
    public void delete(UUID id) {
        userRepository.deleteById(id);
    }
}
