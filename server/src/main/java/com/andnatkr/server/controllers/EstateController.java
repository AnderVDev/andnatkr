package com.andnatkr.server.controllers;

import com.andnatkr.server.domain.dto.EstateDto;
import com.andnatkr.server.domain.entities.Estate;
import com.andnatkr.server.mappers.impl.EstateMapper;
import com.andnatkr.server.services.EstateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/estates")
@RequiredArgsConstructor
public class EstateController {
    private final EstateService estateService;
    private final EstateMapper mapper;

    @PostMapping
    public ResponseEntity<EstateDto> createdEstate(@RequestBody EstateDto estate){
        Estate estateEntity = mapper.mapFrom(estate);
        Estate savedEstateEntity = estateService.save(estateEntity);
        return new ResponseEntity<>(
                mapper.mapTo(savedEstateEntity),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public List<EstateDto> estateList(){
        List<Estate> estates = estateService.findAll();
        return estates.stream()
                .map(mapper::mapTo)
                .collect(Collectors.toList());
    }
}
