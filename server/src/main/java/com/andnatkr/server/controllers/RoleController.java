package com.andnatkr.server.controllers;

import com.andnatkr.server.domain.dto.RoleDto;
import com.andnatkr.server.domain.entities.Role;
import com.andnatkr.server.mappers.Mapper;
import com.andnatkr.server.services.RoleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1")
public class RoleController {
    private final RoleService roleService;
    private final Mapper<Role, RoleDto> roleMapper;

    public RoleController(RoleService roleService, Mapper<Role, RoleDto> roleMapper) {
        this.roleService = roleService;
        this.roleMapper = roleMapper;
    }

    @PostMapping(path ="/roles")
    public ResponseEntity<RoleDto> createdRole(@RequestBody RoleDto role){
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

    @GetMapping(path = "/roles/{id}")
    public ResponseEntity<RoleDto> getRoleById(@PathVariable("id") Integer id){
        Optional<Role> foundRole = roleService.findOne(id);
        return foundRole.map(roleEntity -> {
            RoleDto roleDto = roleMapper.mapTo(roleEntity);
            return new ResponseEntity<>(roleDto, HttpStatus.OK);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping(path = "/roles/{id}")
    public ResponseEntity<RoleDto> fullUpdatedRole(
            @PathVariable("id") Integer id,
            @RequestBody RoleDto role
    ){
        if(!roleService.isExists(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        role.setId(id);
        Role roleEntity = roleMapper.mapFrom(role);
        Role updatedRole = roleService.save(roleEntity);
        return new ResponseEntity<>(
                roleMapper.mapTo(updatedRole),
                HttpStatus.OK
        );
    }

    @PatchMapping(path = "/roles/{id}")
    public ResponseEntity<RoleDto> partialUpdatedRole(
            @PathVariable("id") Integer id,
            @RequestBody RoleDto role
    ){
        if(!roleService.isExists(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        role.setId(id);
        Role roleEntity = roleMapper.mapFrom(role);
        Role updatedRole = roleService.partialUpdated(id, roleEntity);
        return new ResponseEntity<>(
                roleMapper.mapTo(updatedRole),
                HttpStatus.OK
        );
    }

    @DeleteMapping(path = "/roles/{id}")
    public ResponseEntity<RoleDto> deletedRole(@PathVariable("id") Integer id){
        if (!roleService.isExists(id)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        ResponseEntity<RoleDto> roleById = getRoleById(id);
        RoleDto deletedRole = roleById.getBody();
        roleService.delete(id);
        return new ResponseEntity<>(
                deletedRole,
                HttpStatus.NO_CONTENT
        );
    }
}
