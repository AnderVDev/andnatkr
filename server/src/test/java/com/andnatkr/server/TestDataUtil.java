package com.andnatkr.server;

import com.andnatkr.server.domain.entities.FinanceStatement;
import com.andnatkr.server.domain.entities.RealEstate;
import com.andnatkr.server.domain.entities.Role;
import com.andnatkr.server.domain.entities.User;



public class TestDataUtil {
    public TestDataUtil() {}

    public static Role createdTestRoleAdmin(){
        return Role.builder()
                .id(255)
                .description("admin")
                .build();
    }
    public static Role createdTestUserNonAdmin(){
        return Role.builder()
                .id(245)
                .description("Non admin")
                .build();
    }

    public static User createdTestUserA(final Role role){
        return User.builder()
                .firstName("Carlos")
                .lastName("Esteban")
                .email("fake@email.com")
                .password("test")
                .role(role)
                .avatar("avatar.jpg")
                .description("Test user data A")
                .build();
    }

    public static User createdTestUserB(final Role role){
        return User.builder()
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@example.com")
                .password("password123")
                .role(role)
                .avatar("https://example.com/avatar.jpg")
                .description("A brief description about John Doe.")
                .build();
    }
    public static User createdTestUserC(final Role role){
        return User.builder()
                .firstName("Emily")
                .lastName("Johnson")
                .email("emily.johnson@example.com")
                .password("password123")
                .role(role)
                .avatar("https://example.com/avatar.jpg")
                .description("Enthusiastic about community engagement and discussions.")
                .build();
    }

//    Finance Statement Dummy Data

    public static FinanceStatement createdFinanceStatementA(){
        return FinanceStatement.builder()
                .id(1)
                .description("INCOME")
                .build();
    }

//    Real Estate Dummy Data
    public static RealEstate createdRealEstateA(){
        return RealEstate.builder()
                .id(25)
                .dep_number(777)
                .description("3B / 2B")
                .build();
    }
}
