package com.andnatkr.server.controllers;

import com.andnatkr.server.domain.dto.UserDto;
import com.andnatkr.server.domain.entities.User;
import com.andnatkr.server.mappers.Mapper;
import com.andnatkr.server.mappers.impl.UserMapper;
import com.andnatkr.server.repositories.UserRepository;
import com.andnatkr.server.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;
    private final UserMapper mapper;

    @PostMapping
    public ResponseEntity<UserDto> createdUser(@RequestBody UserDto user){
        User userEntity = mapper.mapFrom(user);
        User savedUserEntity = userService.save(userEntity);
        return new ResponseEntity<>(
                mapper.mapTo(savedUserEntity),
                HttpStatus.CREATED);
    }

    @GetMapping
    public List<UserDto> usersList(){
        List<User> users = userService.findAll();
        return users.stream()
                .map(mapper::mapTo)
                .collect(Collectors.toList());
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable("id") UUID id){
        Optional<User> foundUser = userService.findOne(id);
        return foundUser.map(userEntity -> {
            UserDto userDto = mapper.mapTo(userEntity);
            return new ResponseEntity<>(
                    userDto,
                    HttpStatus.OK
            );
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
