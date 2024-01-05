//package com.andnatkr.server.services.impl;
//
//import com.andnatkr.server.domain.entities.RoleOld;
//import com.andnatkr.server.repositories.RoleRepository;
//import com.andnatkr.server.services.RoleService;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//import java.util.stream.Collectors;
//import java.util.stream.StreamSupport;
//
//@Service
//public class RoleServiceImpl implements RoleService {
//
//    private final RoleRepository roleRepository;
//
//    public RoleServiceImpl(RoleRepository roleRepository) {
//        this.roleRepository = roleRepository;
//    }
//
//    @Override
//    public RoleOld save(RoleOld roleOld) {
//        return roleRepository.save(roleOld);
//    }
//
//    @Override
//    public List<RoleOld> findAll() {
//        return StreamSupport.stream(
//                roleRepository
//                        .findAll()
//                        .spliterator(),
//                false)
//                .collect(Collectors.toList());
//    }
//
//    @Override
//    public Optional<RoleOld> findOne(Integer id) {
//        return roleRepository.findById(id);
//    }
//
//    @Override
//    public boolean isExists(Integer id) {
//        return roleRepository.existsById(id);
//    }
//
//    @Override
//    public RoleOld partialUpdated(Integer id, RoleOld roleOld) {
//        roleOld.setId(id);
//        return roleRepository.findById(id).map(existingRole ->{
//            Optional.ofNullable(roleOld.getDescription()).ifPresent(existingRole::setDescription);
//            return roleRepository.save(existingRole);
//        }).orElseThrow(() -> new RuntimeException("Role does not Exist"));
//    }
//
//    @Override
//    public void delete(Integer id) {
//        roleRepository.deleteById(id);
//    }
//}
