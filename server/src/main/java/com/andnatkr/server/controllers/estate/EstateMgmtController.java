package com.andnatkr.server.controllers.estate;

import com.andnatkr.server.domain.dto.estate.EstateMgmtDto;
import com.andnatkr.server.domain.entities.estate.EstateMgmt;
import com.andnatkr.server.mappers.impl.estate.EstateMgmtMapper;
import com.andnatkr.server.services.estate.EstateMgmtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/management")
public class EstateMgmtController {
    private final EstateMgmtService service;
    private final EstateMgmtMapper mapper;

    @PostMapping
    public ResponseEntity<EstateMgmtDto> createdInput(@RequestBody EstateMgmtDto input){
        EstateMgmt newInput = mapper.mapFrom(input);
        EstateMgmt savedInput = service.save(newInput);
        return new ResponseEntity<>(
                mapper.mapTo(savedInput),
                HttpStatus.CREATED);
    }

    @GetMapping
    public List<EstateMgmtDto> inputList(){
        List<EstateMgmt> inputs = service.findAll();
        return inputs.stream()
                .map(mapper::mapTo)
                .collect(Collectors.toList());
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<EstateMgmtDto> getInputById(@PathVariable("id") Long id){
        Optional<EstateMgmt> foundInput = service.findOne(id);
        return foundInput.map(inputEntity -> {
            EstateMgmtDto inputDto = mapper.mapTo(inputEntity);
            return ResponseEntity.ok(inputDto);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<EstateMgmtDto> fullUpdatedInput(
            @PathVariable("id") Long id,
            @RequestBody EstateMgmtDto input
    ){
        if(!service.isExists(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        input.setId(id);
        EstateMgmt inputEntity = mapper.mapFrom(input);
        EstateMgmt updatedInputEntity = service.save(inputEntity);
        return new ResponseEntity<>(
                mapper.mapTo(updatedInputEntity),
                HttpStatus.OK
        );
    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<EstateMgmtDto> partialUpdatedInput(
            @PathVariable("id") Long id,
            @RequestBody EstateMgmtDto input
    ){
        if(!service.isExists(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        input.setId(id);
        EstateMgmt inputEntity = mapper.mapFrom(input);
        EstateMgmt updatedInputEntity = service.partialUpdated(id, inputEntity);
        return new ResponseEntity<>(
                mapper.mapTo(updatedInputEntity),
                HttpStatus.OK
        );
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<EstateMgmtDto> deletedInput(@PathVariable("id") Long id){
        if(!service.isExists(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
