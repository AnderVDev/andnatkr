package com.andnatkr.server.domain.dto.goal;

import com.andnatkr.server.domain.dto.user.UserDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GoalDto {

    private Long id;
    private UserDto user;
    private String objective;
    private Double target;
    private Double current;
    private Date createdAt;
    private Date updatedAt;
}
