package com.andnatkr.server.mappers.impl.todo;

import com.andnatkr.server.domain.dto.todo.TodoDto;
import com.andnatkr.server.domain.entities.todo.Todo;
import com.andnatkr.server.mappers.Mapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TodoMapper implements Mapper<Todo, TodoDto> {

    private final ModelMapper modelMapper;

    @Override
    public TodoDto mapTo(Todo todo) {
        return modelMapper.map(todo, TodoDto.class);
    }

    @Override
    public Todo mapFrom(TodoDto todoDto) {
        return modelMapper.map(todoDto, Todo.class);
    }
}
