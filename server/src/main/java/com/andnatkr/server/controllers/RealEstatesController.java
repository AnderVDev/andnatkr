package com.andnatkr.server.controllers;

import com.andnatkr.server.domain.dto.RealEstateDto;
import com.andnatkr.server.domain.entities.RealEstate;
import com.andnatkr.server.mappers.Mapper;
import com.andnatkr.server.services.RealEstateService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class RealEstatesController {
    private final RealEstateService realEstateService;
    private final Mapper<RealEstate, RealEstateDto> realEstateMapper;

    public RealEstatesController(RealEstateService realEstateService, Mapper<RealEstate, RealEstateDto> realEstateMapper) {
        this.realEstateService = realEstateService;
        this.realEstateMapper = realEstateMapper;
    }

    @PostMapping(path = "/real-estates")
    public ResponseEntity<RealEstateDto> createdRealEstate(@RequestBody RealEstateDto realEstate){
        RealEstate realEstateEntity = realEstateMapper.mapFrom(realEstate);
        RealEstate savedRealEstateEntity = realEstateService.save(realEstateEntity);
        return new ResponseEntity<>(
                realEstateMapper.mapTo(savedRealEstateEntity),
                HttpStatus.CREATED
        );
    }

    @GetMapping(path = "/real-estates")
    public List<RealEstateDto> realEstateList(){
        List<RealEstate> realEstates = realEstateService.findAll();
        return realEstates.stream()
                .map(realEstateMapper::mapTo)
                .collect(Collectors.toList());
    }
}
