//package com.andnatkr.server.mappers.impl;
//
//import com.andnatkr.server.domain.dto.RoleOldDto;
//import com.andnatkr.server.domain.entities.RoleOld;
//import com.andnatkr.server.mappers.Mapper;
//import org.modelmapper.ModelMapper;
//import org.springframework.stereotype.Component;
//
//@Component
//public class RoleMapper implements Mapper<RoleOld, RoleOldDto> {
//    private final ModelMapper modelMapper;
//
//    public RoleMapper(ModelMapper modelMapper) {
//        this.modelMapper = modelMapper;
//    }
//
//    @Override
//    public RoleOldDto mapTo(RoleOld roleOld) {
//        return modelMapper.map(roleOld, RoleOldDto.class);
//    }
//
//    @Override
//    public RoleOld mapFrom(RoleOldDto roleOldDto) {
//        return modelMapper.map(roleOldDto, RoleOld.class);
//    }
//}
