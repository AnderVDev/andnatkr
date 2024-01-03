package com.andnatkr.server.controllers;

import com.andnatkr.server.domain.dto.RoleDto;
import com.andnatkr.server.domain.entities.Role;
import com.andnatkr.server.mappers.Mapper;
import com.andnatkr.server.services.RoleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class RoleController {
    private final RoleService roleService;
    private final Mapper<Role, RoleDto> roleMapper;

    public RoleController(RoleService roleService, Mapper<Role, RoleDto> roleMapper) {
        this.roleService = roleService;
        this.roleMapper = roleMapper;
    }

    @PostMapping(path ="/roles")
    public ResponseEntity<RoleDto> createRole(@RequestBody RoleDto role){
        Role roleEntity = roleMapper.mapFrom(role);
        Role savedRoleEntity = roleService.save(roleEntity);
        return new ResponseEntity<>(
                roleMapper.mapTo(savedRoleEntity),
                HttpStatus.CREATED);
    }

    @GetMapping(path ="/roles")
    public List<RoleDto> rolesList(){
        List<Role> roles = roleService.findAll();
        return roles.stream()
                .map( roleMapper::mapTo)
                .collect(Collectors.toList());
    }
}
