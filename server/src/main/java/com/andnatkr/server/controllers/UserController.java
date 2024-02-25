package com.andnatkr.server.controllers;

import com.andnatkr.server.domain.dto.user.UserDto;
import com.andnatkr.server.domain.entities.user.User;
import com.andnatkr.server.mappers.impl.user.UserMapper;
import com.andnatkr.server.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173",maxAge = 3600, allowCredentials = "true")
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
    @PutMapping(path = "/{id}")
    public ResponseEntity<UserDto> fullUpdatedInput(
            @PathVariable("id") UUID id,
            @RequestBody UserDto user
    ){
        if(!userService.isExists(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        user.setId(id);
        User userEntity = mapper.mapFrom(user);
        User updatedEntity = userService.save(userEntity);
        return new ResponseEntity<>(
                mapper.mapTo(updatedEntity),
                HttpStatus.OK
        );
    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<UserDto> partialUpdatedInput(
            @PathVariable("id") UUID id,
            @RequestBody UserDto user
    ){
        if(!userService.isExists(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        user.setId(id);
        User userEntity = mapper.mapFrom(user);
        User updatedEntity = userService.partialUpdated(id, userEntity);
        return new ResponseEntity<>(
                mapper.mapTo(updatedEntity),
                HttpStatus.OK
        );
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<UserDto> deletedInput(@PathVariable("id") UUID id){
        if(!userService.isExists(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        userService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
