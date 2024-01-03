package com.andnatkr.server.controllers;

import com.andnatkr.server.domain.dto.UserDto;
import com.andnatkr.server.domain.entities.User;
import com.andnatkr.server.mappers.Mapper;
import com.andnatkr.server.repositories.UserRepository;
import com.andnatkr.server.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class UserController {

    private final UserService userService;
    private final Mapper<User, UserDto> userMapper;

    public UserController(UserService userService, Mapper<User, UserDto> userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @PostMapping(path = "/users")
    public ResponseEntity<UserDto> createdUser(@RequestBody UserDto user){
        User userEntity = userMapper.mapFrom(user);
        User savedUserEntity = userService.save(userEntity);
        return new ResponseEntity<>(
                userMapper.mapTo(savedUserEntity),
                HttpStatus.CREATED);
    }

    @GetMapping(path = "/users")
    public List<UserDto> usersList(){
        List<User> users = userService.findAll();
        return users.stream()
                .map(userMapper::mapTo)
                .collect(Collectors.toList());
    }
}
