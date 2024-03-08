package com.andnatkr.server.mappers.impl.goal;

import com.andnatkr.server.domain.dto.goal.GoalDto;
import com.andnatkr.server.domain.entities.goal.Goal;
import com.andnatkr.server.mappers.Mapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GoalMapper implements Mapper<Goal, GoalDto> {

    private final ModelMapper modelMapper;

    @Override
    public GoalDto mapTo(Goal goal) {
        return modelMapper.map(goal, GoalDto.class);
    }

    @Override
    public Goal mapFrom(GoalDto goalDto) {
        return modelMapper.map(goalDto, Goal.class);
    }
}
