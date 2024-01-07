package com.andnatkr.server;

import com.andnatkr.server.domain.dto.EstateDto;
import com.andnatkr.server.domain.dto.UserDto;
import com.andnatkr.server.domain.entities.Estate;
import com.andnatkr.server.domain.entities.User;

import java.util.UUID;


public class TestDataUtil {
    public TestDataUtil() {}

//    public static RoleOld createdTestRoleAdmin(){
//        return RoleOld.builder()
//                .id(255)
//                .description("admin")
//                .build();
//    }
//    public static RoleOld createdTestUserNonAdmin(){
//        return RoleOld.builder()
//                .id(245)
//                .description("Non admin")
//                .build();
//    }

    //    Users Dummy Data
    public static User createdTestUserA(){
        return User.builder()
                .id(UUID.fromString("6dfdc80c-1782-4689-a262-b3ebfa011f25"))
                .firstName("Carlos")
                .lastName("Esteban")
                .email("fake@email.com")
                .password("test")
                .role("admin")
                .avatar("avatar.jpg")
                .description("Test user data A")
                .build();
    }
    public static UserDto createdTestUserDtoA(){
        return UserDto.builder()
                .id(UUID.fromString("6dfdc80c-1782-4689-a262-b3ebfa011f25"))
                .firstName("Carlos")
                .lastName("Esteban")
                .email("fake@email.com")
                .password("test")
                .role("admin")
                .avatar("avatar.jpg")
                .description("Test user data A")
                .build();
    }

    public static User createdTestUserB(){
        return User.builder()
                .id(UUID.fromString("6dfdc80c-1782-4689-a262-b3ebfa011f34"))
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@example.com")
                .password("password123")
                .role("read only")
                .avatar("https://example.com/avatar.jpg")
                .description("A brief description about John Doe.")
                .build();
    }
    public static User createdTestUserC(){
        return User.builder()
                .firstName("Emily")
                .lastName("Johnson")
                .email("emily.johnson@example.com")
                .password("password123")
                .role("admin")
                .avatar("https://example.com/avatar.jpg")
                .description("Enthusiastic about community engagement and discussions.")
                .build();
    }

//    Real Estate Dummy Data
    public static Estate createdEstateA(){
        return Estate.builder()
                .id(25)
                .dep_number(777)
                .description("3B / 2B")
                .comments("comment")
                .build();
    }

    public static EstateDto createdEstateDtoA(){
        return EstateDto.builder()
                .id(25)
                .dep_number(777)
                .description("3B / 2B")
                .comments("comment")
                .build();
    }

    public static Estate createdEstateB(){
        return Estate.builder()
                .id(2)
                .dep_number(543)
                .description("1B / 1B")
                .comments("comment dto test")
                .build();
    }

    public static EstateDto createdEstateDtoB(){
        return EstateDto.builder()
                .id(2)
                .dep_number(543)
                .description("1B / 1B")
                .comments("comment dto test")
                .build();
    }
}
