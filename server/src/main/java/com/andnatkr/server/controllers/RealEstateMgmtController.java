package com.andnatkr.server.controllers;

import com.andnatkr.server.domain.dto.RealEstateMgmtDto;
import com.andnatkr.server.domain.entities.RealEstateMgmt;
import com.andnatkr.server.mappers.Mapper;
import com.andnatkr.server.services.RealEstateMgmtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/management")
public class RealEstateMgmtController {
    private final RealEstateMgmtService mgmtService;
    private final Mapper<RealEstateMgmt, RealEstateMgmtDto> mgmtMapper;

    @PostMapping
    public ResponseEntity<RealEstateMgmtDto> createdInput(@RequestBody RealEstateMgmtDto input){
        RealEstateMgmt newInput = mgmtMapper.mapFrom(input);
        RealEstateMgmt savedInput = mgmtService.save(newInput);
        return new ResponseEntity<>(
                mgmtMapper.mapTo(savedInput),
                HttpStatus.CREATED);
    }
    @GetMapping
    public List<RealEstateMgmtDto> inputList(){
        List<RealEstateMgmt> inputs = mgmtService.findAll();
        return inputs.stream()
                .map(mgmtMapper::mapTo)
                .collect(Collectors.toList());
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<RealEstateMgmtDto> getInputById(@PathVariable("id") Long id){
        Optional<RealEstateMgmt> foundInput = mgmtService.findOne(id);
        return foundInput.map(inputEntity -> {
            RealEstateMgmtDto inputDto = mgmtMapper.mapTo(inputEntity);
            return ResponseEntity.ok(inputDto);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<RealEstateMgmtDto> fullUpdatedInput(
            @PathVariable("id") Long id,
            @RequestBody RealEstateMgmtDto input
    ){
        if(!mgmtService.isExists(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        input.setId(id);
        RealEstateMgmt inputEntity = mgmtMapper.mapFrom(input);
        RealEstateMgmt updatedInputEntity = mgmtService.save(inputEntity);
        return new ResponseEntity<>(
                mgmtMapper.mapTo(updatedInputEntity),
                HttpStatus.OK
        );
    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<RealEstateMgmtDto> partialUpdatedInput(
            @PathVariable("id") Long id,
            @RequestBody RealEstateMgmtDto input
    ){
        if(!mgmtService.isExists(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        input.setId(id);
        RealEstateMgmt inputEntity = mgmtMapper.mapFrom(input);
        RealEstateMgmt updatedInputEntity = mgmtService.partialUpdated(id, inputEntity);
        return new ResponseEntity<>(
                mgmtMapper.mapTo(updatedInputEntity),
                HttpStatus.OK
        );
    }

    @DeleteMapping(path = "/{id}")
    public  ResponseEntity<RealEstateMgmtDto> deletedInput(@PathVariable("id") Long id){
        if(!mgmtService.isExists(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        mgmtService.delete(id);
        return new ResponseEntity<>(
                HttpStatus.NO_CONTENT
        );
    }

}
