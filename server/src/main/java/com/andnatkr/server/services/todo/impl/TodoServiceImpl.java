package com.andnatkr.server.services.todo.impl;

import com.andnatkr.server.domain.entities.todo.Todo;
import com.andnatkr.server.mappers.impl.todo.TodoMapper;
import com.andnatkr.server.repositories.todo.TodoRepository;
import com.andnatkr.server.services.todo.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService {
    private final TodoRepository repository;
    @Override
    public Todo save(Todo input) {
        return repository.save(input);
    }

    @Override
    public List<Todo> findAll() {
        return StreamSupport.stream(
                repository
                        .findAll()
                        .spliterator(),
                false
        ).collect(Collectors.toList());
    }

    @Override
    public Optional<Todo> findOne(Long id) {
        return repository.findById(id);
    }

    @Override
    public boolean isExists(Long id) {
        return repository.existsById(id);
    }

    @Override
    public Todo partialUpdated(Long id, Todo inputEntity) {
        inputEntity.setId(id);
        return repository.findById(id).map(existingInput -> {
            Optional.ofNullable(inputEntity.getUser()).ifPresent(existingInput::setUser);
            Optional.ofNullable(inputEntity.getDescription()).ifPresent(existingInput::setDescription);
            Optional.ofNullable(inputEntity.getIsChecked()).ifPresent(existingInput::setIsChecked);
            Optional.ofNullable(inputEntity.getType()).ifPresent(existingInput::setType);
            return repository.save(existingInput);
        }).orElseThrow(() -> new RuntimeException("Input Does not Exist"));
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }


}
