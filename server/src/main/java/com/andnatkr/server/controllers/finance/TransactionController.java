package com.andnatkr.server.controllers.finance;


import com.andnatkr.server.domain.dto.finance.TransactionDto;
import com.andnatkr.server.domain.entities.finance.Transaction;
import com.andnatkr.server.mappers.impl.finance.TransactionMapper;
import com.andnatkr.server.services.finance.TransactionService;
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
@RequestMapping("/api/v1/transaction")
public class TransactionController {
    private final TransactionService service;
    private final TransactionMapper mapper;

    @PostMapping
    public ResponseEntity<TransactionDto> createdInput(@RequestBody TransactionDto input){
        Transaction newInput = mapper.mapFrom(input);
        Transaction savedInput = service.save(newInput);
        return new ResponseEntity<>(
                mapper.mapTo(savedInput),
                HttpStatus.CREATED);
    }

    @GetMapping
    public List<TransactionDto> inputList(){
        List<Transaction> inputs = service.findAll();
        return inputs.stream()
                .map(mapper::mapTo)
                .collect(Collectors.toList());
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<TransactionDto> getInputById(@PathVariable("id") Long id){
        Optional<Transaction> foundInput = service.findOne(id);
        return foundInput.map(inputEntity -> {
            TransactionDto inputDto = mapper.mapTo(inputEntity);
            return ResponseEntity.ok(inputDto);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<TransactionDto> fullUpdatedInput(
            @PathVariable("id") Long id,
            @RequestBody TransactionDto input
    ){
        if(!service.isExists(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        input.setId(id);
        Transaction inputEntity = mapper.mapFrom(input);
        Transaction updatedInputEntity = service.save(inputEntity);
        return new ResponseEntity<>(
                mapper.mapTo(updatedInputEntity),
                HttpStatus.OK
        );
    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<TransactionDto> partialUpdatedInput(
            @PathVariable("id") Long id,
            @RequestBody TransactionDto input
    ){
        if(!service.isExists(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        input.setId(id);
        Transaction inputEntity = mapper.mapFrom(input);
        Transaction updatedInputEntity = service.partialUpdated(id, inputEntity);
        return new ResponseEntity<>(
                mapper.mapTo(updatedInputEntity),
                HttpStatus.OK
        );
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<TransactionDto> deletedInput(@PathVariable("id") Long id){
        if(!service.isExists(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }



}
