package com.andnatkr.server.domain.dto.todo;

import com.andnatkr.server.domain.dto.user.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TodoDto {

    private Long id;
    private UserDto user;
    private String description;
    private Boolean isChecked;
    private String type;
    private Date createdAt;
    private Date updatedAt;
}
