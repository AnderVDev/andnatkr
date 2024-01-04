package com.andnatkr.server.controllers;

import com.andnatkr.server.domain.dto.RealEstateMgmtDto;
import com.andnatkr.server.domain.entities.RealEstateMgmt;
import com.andnatkr.server.mappers.Mapper;
import com.andnatkr.server.services.RealEstateMgmtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class RealEstateMgmtController {
    private final RealEstateMgmtService mgmtService;
    private final Mapper<RealEstateMgmt, RealEstateMgmtDto> mgmtMapper;

    public RealEstateMgmtController(RealEstateMgmtService mgmtService, Mapper<RealEstateMgmt, RealEstateMgmtDto> mgmtMapper) {
        this.mgmtService = mgmtService;
        this.mgmtMapper = mgmtMapper;
    }

    @PostMapping("/management")
    public ResponseEntity<RealEstateMgmtDto> createdInput(@RequestBody RealEstateMgmtDto input){
        RealEstateMgmt newInput = mgmtMapper.mapFrom(input);
        RealEstateMgmt savedInput = mgmtService.save(newInput);
        return new ResponseEntity<>(
                mgmtMapper.mapTo(savedInput),
                HttpStatus.CREATED);
    }
    @GetMapping("/management")
    public List<RealEstateMgmtDto> inputList(){
        List<RealEstateMgmt> inputs = mgmtService.findAll();
        return inputs.stream()
                .map(mgmtMapper::mapTo)
                .collect(Collectors.toList());
    }
}
