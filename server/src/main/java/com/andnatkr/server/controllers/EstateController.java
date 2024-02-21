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
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173",maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/v1/estates")
@RequiredArgsConstructor
public class EstateController {
    private final EstateService service;
    private final EstateMapper mapper;

    @PostMapping
    public ResponseEntity<EstateDto> createdEstate(@RequestBody EstateDto estate){
        Estate estateEntity = mapper.mapFrom(estate);
        Estate savedEstateEntity = service.save(estateEntity);
        return new ResponseEntity<>(
                mapper.mapTo(savedEstateEntity),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public List<EstateDto> estateList(){
        List<Estate> estates = service.findAll();
        return estates.stream()
                .map(mapper::mapTo)
                .collect(Collectors.toList());
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<EstateDto> getEstateById(@PathVariable("id") Integer id){
        Optional<Estate> foundEstate = service.findOne(id);
        return  foundEstate.map(estateEntity -> {
            EstateDto estateDto = mapper.mapTo(estateEntity);
            return new ResponseEntity<>(estateDto,HttpStatus.OK);

        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<EstateDto> fullUpdatedEstate(
            @PathVariable("id") Integer id,
            @RequestBody EstateDto estate
    ){
        if(!service.isExists(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        estate.setId(id);
        Estate estateEntity = mapper.mapFrom(estate);
        Estate updatedEntity = service.save(estateEntity);
        return  new ResponseEntity<>(
                mapper.mapTo(updatedEntity),
                HttpStatus.OK
        );
    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<EstateDto> partialUpdatedEstate(
            @PathVariable("id") Integer id,
            @RequestBody EstateDto estate
    ){
        if(!service.isExists(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        estate.setId(id);
        Estate estateEntity = mapper.mapFrom(estate);
        Estate updatedEntity = service.partialUpdated(id, estateEntity);
        return  new ResponseEntity<>(
                mapper.mapTo(updatedEntity),
                HttpStatus.OK
        );
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<EstateDto> deletedEstate(@PathVariable("id") Integer id){
        if(!service.isExists(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
