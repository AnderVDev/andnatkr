package com.andnatkr.server.controllers.todo;

import com.andnatkr.server.domain.dto.todo.TodoDto;
import com.andnatkr.server.domain.entities.finance.Transaction;
import com.andnatkr.server.domain.entities.todo.Todo;
import com.andnatkr.server.mappers.impl.todo.TodoMapper;
import com.andnatkr.server.services.todo.TodoService;
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
@RequestMapping("/api/v1/todo")
public class TodoController {
    private final TodoService service;
    private final TodoMapper mapper;


    @PostMapping
    public ResponseEntity<TodoDto> createdInput(@RequestBody TodoDto input){
        Todo newInput = mapper.mapFrom(input);
        Todo savedInput = service.save(newInput);
        return new ResponseEntity<>(
                mapper.mapTo(savedInput),
                HttpStatus.CREATED);
    }

    @GetMapping
    public List<TodoDto> inputList(){
        List<Todo> inputs = service.findAll();
        return inputs.stream()
                .map(mapper::mapTo)
                .collect(Collectors.toList());
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<TodoDto> getInputById(@PathVariable("id") Long id){
        Optional<Todo> foundInput = service.findOne(id);
        return foundInput.map(inputEntity -> {
            TodoDto inputDto = mapper.mapTo(inputEntity);
            return ResponseEntity.ok(inputDto);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<TodoDto> fullUpdatedInput(
            @PathVariable("id") Long id,
            @RequestBody TodoDto input
    ){
        if(!service.isExists(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        input.setId(id);
        Todo inputEntity = mapper.mapFrom(input);
        Todo updatedInputEntity = service.save(inputEntity);
        return new ResponseEntity<>(
                mapper.mapTo(updatedInputEntity),
                HttpStatus.OK
        );
    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<TodoDto> partialUpdatedInput(
            @PathVariable("id") Long id,
            @RequestBody TodoDto input
    ){
        if(!service.isExists(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        input.setId(id);
        Todo inputEntity = mapper.mapFrom(input);
        Todo updatedInputEntity = service.partialUpdated(id, inputEntity);
        return new ResponseEntity<>(
                mapper.mapTo(updatedInputEntity),
                HttpStatus.OK
        );
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<TodoDto> deletedInput(@PathVariable("id") Long id){
        if(!service.isExists(id)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }












}
