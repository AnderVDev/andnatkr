package com.andnatkr.server;

import com.andnatkr.server.domain.entities.RealEstate;
import com.andnatkr.server.domain.entities.RoleOld;
import com.andnatkr.server.domain.entities.User;



public class TestDataUtil {
    public TestDataUtil() {}

    public static RoleOld createdTestRoleAdmin(){
        return RoleOld.builder()
                .id(255)
                .description("admin")
                .build();
    }
    public static RoleOld createdTestUserNonAdmin(){
        return RoleOld.builder()
                .id(245)
                .description("Non admin")
                .build();
    }

    public static User createdTestUserA(final RoleOld roleOld){
        return User.builder()
                .firstName("Carlos")
                .lastName("Esteban")
                .email("fake@email.com")
                .password("test")
                .roleOld(roleOld)
                .avatar("avatar.jpg")
                .description("Test user data A")
                .build();
    }

    public static User createdTestUserB(final RoleOld roleOld){
        return User.builder()
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@example.com")
                .password("password123")
                .roleOld(roleOld)
                .avatar("https://example.com/avatar.jpg")
                .description("A brief description about John Doe.")
                .build();
    }
    public static User createdTestUserC(final RoleOld roleOld){
        return User.builder()
                .firstName("Emily")
                .lastName("Johnson")
                .email("emily.johnson@example.com")
                .password("password123")
                .roleOld(roleOld)
                .avatar("https://example.com/avatar.jpg")
                .description("Enthusiastic about community engagement and discussions.")
                .build();
    }

//    Finance Statement Dummy Data



//    Real Estate Dummy Data
    public static RealEstate createdRealEstateA(){
        return RealEstate.builder()
                .id(25)
                .dep_number(777)
                .description("3B / 2B")
                .build();
    }
}
