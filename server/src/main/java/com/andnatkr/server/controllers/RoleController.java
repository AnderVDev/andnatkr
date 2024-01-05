//package com.andnatkr.server.controllers;
//
//import com.andnatkr.server.domain.dto.RoleOldDto;
//import com.andnatkr.server.domain.entities.RoleOld;
//import com.andnatkr.server.mappers.Mapper;
//import com.andnatkr.server.services.RoleService;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.Optional;
//import java.util.stream.Collectors;
//
//@RestController
//@RequestMapping("/api/v1/roles")
//public class RoleController {
//    private final RoleService roleService;
//    private final Mapper<RoleOld, RoleOldDto> roleMapper;
//
//    public RoleController(RoleService roleService, Mapper<RoleOld, RoleOldDto> roleMapper) {
//        this.roleService = roleService;
//        this.roleMapper = roleMapper;
//    }
//
//    @PostMapping
//    public ResponseEntity<RoleOldDto> createdRole(@RequestBody RoleOldDto role){
//        RoleOld roleOldEntity = roleMapper.mapFrom(role);
//        RoleOld savedRoleEntityOld = roleService.save(roleOldEntity);
//        return new ResponseEntity<>(
//                roleMapper.mapTo(savedRoleEntityOld),
//                HttpStatus.CREATED);
//    }
//
//    @GetMapping
//    public List<RoleOldDto> rolesList(){
//        List<RoleOld> roleOlds = roleService.findAll();
//        return roleOlds.stream()
//                .map( roleMapper::mapTo)
//                .collect(Collectors.toList());
//    }
//
//    @GetMapping(path = "/{id}")
//    public ResponseEntity<RoleOldDto> getRoleById(@PathVariable("id") Integer id){
//        Optional<RoleOld> foundRole = roleService.findOne(id);
//        return foundRole.map(roleEntity -> {
//            RoleOldDto roleOldDto = roleMapper.mapTo(roleEntity);
//            return new ResponseEntity<>(roleOldDto, HttpStatus.OK);
//        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
//    }
//
//    @PutMapping(path = "/{id}")
//    public ResponseEntity<RoleOldDto> fullUpdatedRole(
//            @PathVariable("id") Integer id,
//            @RequestBody RoleOldDto role
//    ){
//        if(!roleService.isExists(id)){
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//        role.setId(id);
//        RoleOld roleOldEntity = roleMapper.mapFrom(role);
//        RoleOld updatedRoleOld = roleService.save(roleOldEntity);
//        return new ResponseEntity<>(
//                roleMapper.mapTo(updatedRoleOld),
//                HttpStatus.OK
//        );
//    }
//
//    @PatchMapping(path = "/{id}")
//    public ResponseEntity<RoleOldDto> partialUpdatedRole(
//            @PathVariable("id") Integer id,
//            @RequestBody RoleOldDto role
//    ){
//        if(!roleService.isExists(id)){
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//        role.setId(id);
//        RoleOld roleOldEntity = roleMapper.mapFrom(role);
//        RoleOld updatedRoleOld = roleService.partialUpdated(id, roleOldEntity);
//        return new ResponseEntity<>(
//                roleMapper.mapTo(updatedRoleOld),
//                HttpStatus.OK
//        );
//    }
//
//    @DeleteMapping(path = "/{id}")
//    public ResponseEntity<RoleOldDto> deletedRole(@PathVariable("id") Integer id){
//        if (!roleService.isExists(id)){
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        }
//        ResponseEntity<RoleOldDto> roleById = getRoleById(id);
//        RoleOldDto deletedRole = roleById.getBody();
//        roleService.delete(id);
//
//        return new ResponseEntity<>(
//                deletedRole,
//                HttpStatus.NO_CONTENT
//        );
//    }
//}
