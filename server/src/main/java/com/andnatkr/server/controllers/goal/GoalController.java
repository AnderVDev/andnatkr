package com.andnatkr.server.controllers.goal;

import com.andnatkr.server.domain.dto.goal.GoalDto;
import com.andnatkr.server.domain.entities.goal.Goal;
import com.andnatkr.server.mappers.impl.goal.GoalMapper;
import com.andnatkr.server.services.goal.GoalService;
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
@RequestMapping("/api/v1/goal")
public class GoalController {
    private final GoalService service;
    private final GoalMapper mapper;


    @PostMapping
    public ResponseEntity<GoalDto> createdInput(@RequestBody GoalDto input){
        Goal newInput = mapper.mapFrom(input);
        Goal savedInput = service.save(newInput);
        return new ResponseEntity<>(
                mapper.mapTo(savedInput),
                HttpStatus.CREATED);
    }

    @GetMapping
    public List<GoalDto> inputList(){
        List<Goal> inputs = service.findAll();
        return inputs.stream()
                .map(mapper::mapTo)
                .collect(Collectors.toList());
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<GoalDto> getInputById(@PathVariable("id") Long id){
        Optional<Goal> foundInput = service.findOne(id);
        return foundInput.map(inputEntity -> {
            GoalDto inputDto = mapper.mapTo(inputEntity);
            return ResponseEntity.ok(inputDto);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<GoalDto> fullUpdatedInput(
            @PathVariable("id") Long id,
            @RequestBody GoalDto input
    ){
        if(!service.isExists(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        input.setId(id);
        Goal inputEntity = mapper.mapFrom(input);
        Goal updatedInputEntity = service.save(inputEntity);
        return new ResponseEntity<>(
                mapper.mapTo(updatedInputEntity),
                HttpStatus.OK
        );
    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<GoalDto> partialUpdatedInput(
            @PathVariable("id") Long id,
            @RequestBody GoalDto input
    ){
        if(!service.isExists(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        input.setId(id);
        Goal inputEntity = mapper.mapFrom(input);
        Goal updatedInputEntity = service.partialUpdated(id, inputEntity);
        return new ResponseEntity<>(
                mapper.mapTo(updatedInputEntity),
                HttpStatus.OK
        );
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<GoalDto> deletedInput(@PathVariable("id") Long id){
        if(!service.isExists(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }




}
