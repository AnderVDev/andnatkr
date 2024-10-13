package com.andnatkr.server.controllers.personal_finance;


import com.andnatkr.server.domain.dto.personal_finance.Personal_TransactionDto;
import com.andnatkr.server.domain.entities.personal_finance.Personal_Transaction;
import com.andnatkr.server.mappers.impl.personal_finance.Personal_TransactionMapper;
import com.andnatkr.server.services.personal_finance.Personal_TransactionService;
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
@RequestMapping("/api/v1/personal_transaction")
public class Personal_TransactionController {
    private final Personal_TransactionService service;
    private final Personal_TransactionMapper mapper;

    @PostMapping
    public ResponseEntity<Personal_TransactionDto> createdInput(@RequestBody Personal_TransactionDto input){
        Personal_Transaction newInput = mapper.mapFrom(input);
        Personal_Transaction savedInput = service.save(newInput);
        return new ResponseEntity<>(
                mapper.mapTo(savedInput),
                HttpStatus.CREATED);
    }

    @GetMapping
    public List<Personal_TransactionDto> inputList(){
        List<Personal_Transaction> inputs = service.findAll();
        return inputs.stream()
                .map(mapper::mapTo)
                .collect(Collectors.toList());
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Personal_TransactionDto> getInputById(@PathVariable("id") Long id){
        Optional<Personal_Transaction> foundInput = service.findOne(id);
        return foundInput.map(inputEntity -> {
            Personal_TransactionDto inputDto = mapper.mapTo(inputEntity);
            return ResponseEntity.ok(inputDto);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<Personal_TransactionDto> fullUpdatedInput(
            @PathVariable("id") Long id,
            @RequestBody Personal_TransactionDto input
    ){
        if(!service.isExists(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        input.setId(id);
        Personal_Transaction inputEntity = mapper.mapFrom(input);
        Personal_Transaction updatedInputEntity = service.save(inputEntity);
        return new ResponseEntity<>(
                mapper.mapTo(updatedInputEntity),
                HttpStatus.OK
        );
    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<Personal_TransactionDto> partialUpdatedInput(
            @PathVariable("id") Long id,
            @RequestBody Personal_TransactionDto input
    ){
        if(!service.isExists(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        input.setId(id);
        Personal_Transaction inputEntity = mapper.mapFrom(input);
        Personal_Transaction updatedInputEntity = service.partialUpdated(id, inputEntity);
        return new ResponseEntity<>(
                mapper.mapTo(updatedInputEntity),
                HttpStatus.OK
        );
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Personal_TransactionDto> deletedInput(@PathVariable("id") Long id){
        if(!service.isExists(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }



}
