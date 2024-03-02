package com.andnatkr.server.services.todo;

import com.andnatkr.server.domain.entities.todo.Todo;

import java.util.List;
import java.util.Optional;

public interface TodoService {
    Todo save(Todo input);

    List<Todo> findAll();

    Optional<Todo> findOne(Long id);

    boolean isExists(Long id);

    Todo partialUpdated(Long id, Todo inputEntity);

    void delete(Long id);
}
