package com.andnatkr.server;

import com.andnatkr.server.domain.entities.Role;
import com.andnatkr.server.domain.entities.User;

import java.sql.Timestamp;
import java.util.UUID;

public class TestDataUtil {
    public TestDataUtil() {}

    public static Role createdTestUserAdmin(){
        return Role.builder()
                .role_id(255)
                .description("admin")
                .build();
    }

    public static User createdTestUserA(final Role role){
        return User.builder()
                .id(UUID.randomUUID())
                .firstName("Carlos")
                .lastName("Estebanz")
                .email("fake@email.com")
                .password("test")
                .role(role)
                .avatar("avatar.jpg")
                .description("Test user data A")
                .TIMESTAMP(new Timestamp(System.currentTimeMillis()))
                .build();
    }
}
