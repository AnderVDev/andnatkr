package com.andnatkr.server.repositories.todo;

import com.andnatkr.server.domain.entities.todo.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
}
