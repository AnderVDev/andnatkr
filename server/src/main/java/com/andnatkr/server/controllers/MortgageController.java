package com.andnatkr.server.controllers;

import com.andnatkr.server.domain.dto.MortgageDto;
import com.andnatkr.server.domain.entities.Mortgage;
import com.andnatkr.server.mappers.Mapper;
import com.andnatkr.server.services.MortgageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/mortgages")
public class MortgageController {
    private final MortgageService mortgageService;
    private final Mapper<Mortgage, MortgageDto> mortgageMapper;

    @PostMapping
    public ResponseEntity<MortgageDto> createdMortgage(@RequestBody MortgageDto mortgage){
        Mortgage mortgageEntity = mortgageMapper.mapFrom(mortgage);
        Mortgage savedMortgageEntity = mortgageService.save(mortgageEntity);
        return new ResponseEntity<>(
                mortgageMapper.mapTo(savedMortgageEntity),
                HttpStatus.CREATED
        );
    }
    @GetMapping
    public List<MortgageDto> mortgageList(){
        List <Mortgage> mortgages = mortgageService.findAll();
        return mortgages.stream()
                .map(mortgageMapper::mapTo)
                .collect(Collectors.toList());
    }
}
