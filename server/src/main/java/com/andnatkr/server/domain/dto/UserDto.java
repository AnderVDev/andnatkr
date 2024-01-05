package com.andnatkr.server.domain.dto;

//import com.andnatkr.server.domain.entities.RoleOld;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {
    private UUID id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String role;
    private String avatar;
    private String description;
    private Date createdAt;
    private Date updatedAt;
}
