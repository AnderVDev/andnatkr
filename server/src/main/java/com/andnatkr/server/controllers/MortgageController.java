package com.andnatkr.server.controllers;

import com.andnatkr.server.domain.dto.MortgageDto;
import com.andnatkr.server.domain.entities.Mortgage;

import com.andnatkr.server.mappers.impl.MortgageMapper;
import com.andnatkr.server.services.MortgageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/mortgages")
public class MortgageController {
    private final MortgageService service;
    private final MortgageMapper mapper;

    @PostMapping
    public ResponseEntity<MortgageDto> createdMortgage(@RequestBody MortgageDto mortgage){
        Mortgage mortgageEntity = mapper.mapFrom(mortgage);
        Mortgage savedMortgageEntity = service.save(mortgageEntity);
        return new ResponseEntity<>(
                mapper.mapTo(savedMortgageEntity),
                HttpStatus.CREATED
        );
    }
    @GetMapping
    public List<MortgageDto> mortgageList(){
        List <Mortgage> mortgages = service.findAll();
        return mortgages.stream()
                .map(mapper::mapTo)
                .collect(Collectors.toList());
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<MortgageDto> getEntryByID(@PathVariable("id") Long id){
        Optional<Mortgage> foundEntry = service.findOne(id);
        return foundEntry.map(entryEntity ->{
            MortgageDto entryDto = mapper.mapTo(entryEntity);
            return ResponseEntity.ok(entryDto);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<MortgageDto> fullUpdatedEntry(
            @PathVariable("id") Long id,
            @RequestBody MortgageDto entry
    ){
        if(!service.isExists(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        entry.setId(id);
        Mortgage entryEntity = mapper.mapFrom(entry);
        Mortgage savedEntryEntity = service.save(entryEntity);
        return new ResponseEntity<>(
                mapper.mapTo(savedEntryEntity),
                HttpStatus.OK
        );
    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<MortgageDto> partialUpdatedEntry(
            @PathVariable("id") Long id,
            @RequestBody MortgageDto entry
    ){
        if(!service.isExists(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        entry.setId(id);
        Mortgage entryEntity = mapper.mapFrom(entry);
        Mortgage savedEntryEntity = service.partialUpdated(id, entryEntity);
        return new ResponseEntity<>(
                mapper.mapTo(savedEntryEntity),
                HttpStatus.OK
        );
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<MortgageDto> deletedEntry(@PathVariable("id") Long id){
        if(!service.isExists(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
