package com.andnatkr.server;

import com.andnatkr.server.domain.dto.estate.EstateDto;
import com.andnatkr.server.domain.dto.estate.EstateMgmtDto;
import com.andnatkr.server.domain.dto.estate.MortgageDto;
import com.andnatkr.server.domain.dto.user.UserDto;
import com.andnatkr.server.domain.entities.estate.Estate;
import com.andnatkr.server.domain.entities.estate.EstateMgmt;
import com.andnatkr.server.domain.entities.estate.Mortgage;
import com.andnatkr.server.domain.entities.user.User;

import java.util.UUID;


public class TestDataUtil {
    public TestDataUtil() {}

    //    Users Dummy Data
    public static User createdTestUserA(){
        return User.builder()
                .id(UUID.fromString("6dfdc80c-1782-4689-a262-b3ebfa011f25"))
                .firstName("Carlos")
                .lastName("Esteban")
                .email("fake@email.com")
                .password("test")
//                .role("admin")
                .avatar("avatar.jpg")
                .build();
    }
    public static UserDto createdTestUserDtoA(){
        return UserDto.builder()
                .id(UUID.fromString("6dfdc80c-1782-4689-a262-b3ebfa011f25"))
                .firstName("Carlos")
                .lastName("Esteban")
                .email("fake@email.com")
                .role("admin")
                .avatar("avatar.jpg")
                .build();
    }

    public static User createdTestUserB(){
        return User.builder()
                .id(UUID.fromString("6dfdc80c-1782-4689-a262-b3ebfa011f34"))
                .firstName("John")
                .lastName("Doe")
                .email("john.doe@example.com")
                .password("password123")
//                .role("USER")
                .avatar("https://example.com/avatar.jpg")
                .build();
    }
    public static User createdTestUserC(){
        return User.builder()
                .firstName("Emily")
                .lastName("Johnson")
                .email("emily.johnson@example.com")
                .password("password123")
//                .role("admin")
                .avatar("https://example.com/avatar.jpg")
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

//    Input Management Dummy Data

    public static EstateMgmt createdEstateMgmtA(){
        return  EstateMgmt.builder()
                .id(1L)
                .user(null)
                .financeStatement("INCOME")
                .estate(null)
                .amount(1500)
                .month("July")
                .year(2023)
                .detail("No details")
                .comments("No important comments")
                .build();
    }

    public static EstateMgmtDto createdEstateMgmtDtoA(){
        return  EstateMgmtDto.builder()
                .id(1L)
                .user(null)
                .financeStatement("INCOME")
                .estate(null)
                .amount(1500)
                .month("July")
                .year(2023)
                .detail("No details")
                .comments("No important comments")
                .build();
    }

    public static EstateMgmt createdEstateMgmtB(){
        return  EstateMgmt.builder()
                .id(1L)
                .user(null)
                .financeStatement("INCOME")
                .estate(null)
                .amount(1700)
                .month("May")
                .year(2022)
                .detail("No details")
                .comments("No important comments")
                .build();
    }

    //    Entry Mortgage Dummy Data
    public static Mortgage createdMortgageEntryA(){
        return Mortgage.builder()
                .id(1L)
                .user(null)
                .estate(null)
                .installment_number(25)
                .month("May")
                .year(2023)
                .uf(15.8421)
                .clp(618451.2)
                .comments("No important comments")
                .build();
    }

    public static MortgageDto createdMortgageEntryDtoA(){
        return MortgageDto.builder()
                .id(1L)
                .user(null)
                .estate(null)
                .installment_number(25)
                .month("May")
                .year(2023)
                .uf(15.8421)
                .clp(618451.2)
                .comments("No important comments")
                .build();
    }

    public static Mortgage createdMortgageEntryB(){
        return Mortgage.builder()
                .id(1L)
                .user(null)
                .estate(null)
                .installment_number(25)
                .month("June")
                .year(2023)
                .uf(15.1248)
                .clp(613451.2)
                .comments("No important comments")
                .build();
    }
}
