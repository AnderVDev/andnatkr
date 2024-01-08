package com.andnatkr.server.controllers;

import com.andnatkr.server.TestDataUtil;
import com.andnatkr.server.domain.dto.UserDto;
import com.andnatkr.server.domain.entities.User;
import com.andnatkr.server.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
@AutoConfigureMockMvc
public class UserControllerIntegrationTests {
    private final UserService service;
    private final MockMvc mockMvc;
    private final ObjectMapper mapper;

    @Autowired
    public UserControllerIntegrationTests(UserService service, MockMvc mockMvc) {
        this.service = service;
        this.mockMvc = mockMvc;
        this.mapper = new ObjectMapper();
    }

    @Test
    public void testThatCreateUserSuccessfullyReturnsHttp201Created() throws Exception{
        User testUser = TestDataUtil.createdTestUserA();
        String userJson = mapper.writeValueAsString(testUser);
        mockMvc.perform(
                MockMvcRequestBuilders.post("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson)
        ).andExpect(
                MockMvcResultMatchers.status().isCreated()
        );
    }

    @Test
    public void testThatCreateUserSuccessfullyReturnsSavedUser() throws Exception {
        User testUser = TestDataUtil.createdTestUserA();
        String userJson = mapper.writeValueAsString(testUser);
        mockMvc.perform(
                MockMvcRequestBuilders.post("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson)
        ).andExpect(
                MockMvcResultMatchers.status().isCreated()
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".firstName").value(testUser.getFirstName())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".lastName").value(testUser.getLastName())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".email").value(testUser.getEmail())
        );
    }

    @Test
    public void testThatListUsersReturnsHttpStatus200() throws Exception {
        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        );
    }

    @Test
    public void testThatListUsersSuccessfullyReturnsListOfUsers() throws Exception {
        User testUser = TestDataUtil.createdTestUserA();
        service.save(testUser);
        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$[0].firstName").value(testUser.getFirstName())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$[0].lastName").value(testUser.getLastName())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$[0].email").value(testUser.getEmail())
        );
    }

    @Test
    public void testThatGetUserReturnsHttpStatus200WhenUserExists() throws Exception {
        User testUser = TestDataUtil.createdTestUserA();
        service.save(testUser);
        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/v1/users/" + testUser.getId())
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        );
    }

    @Test
    public void testThatGetUserReturnsUserWhenUserExists() throws Exception {
        User testUser = TestDataUtil.createdTestUserA();
        service.save(testUser);
        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/v1/users/" + testUser.getId())
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".firstName").value(testUser.getFirstName())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".lastName").value(testUser.getLastName())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".email").value(testUser.getEmail())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".password").value(testUser.getPassword())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".role").value(testUser.getRole())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".avatar").value(testUser.getAvatar())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".description").value(testUser.getDescription())
        );
    }

    @Test
    public void testThatGetUserReturnsHttpStatus404WhenNoUserExists() throws Exception {
        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/v1/users/83d70697-4b1f-4055-ab20-0d375f88f173")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isNotFound()
        );
    }

    @Test
    public void testThatFullUpdateUserReturnsHttpStatus404WhenNoUserExists() throws Exception {
        UserDto testUserDtoA = TestDataUtil.createdTestUserDtoA();
        String userDtoJson = mapper.writeValueAsString(testUserDtoA);
        mockMvc.perform(
                MockMvcRequestBuilders.put("/api/v1/users/83d70697-4b1f-4055-ab20-0d375f88f173")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userDtoJson)
        ).andExpect(
                MockMvcResultMatchers.status().isNotFound()
        );
    }

    @Test
    public void testThatFullUpdateUserReturnsHttpStatus200WhenUserExists() throws Exception {
        User testUser = TestDataUtil.createdTestUserA();
        User savedUser = service.save(testUser);

        UserDto testUserDtoA = TestDataUtil.createdTestUserDtoA();
        String userDtoJson = mapper.writeValueAsString(testUserDtoA);
        mockMvc.perform(
                MockMvcRequestBuilders.put("/api/v1/users/"+ savedUser.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userDtoJson)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        );
    }

    @Test
    public void testThatFullUpdateUpdatesExistingUser() throws Exception {
        User testUser = TestDataUtil.createdTestUserA();
        User savedUser = service.save(testUser);

        User userDto = TestDataUtil.createdTestUserB();
        userDto.setId(savedUser.getId());
        String userDtoUpdateJson = mapper.writeValueAsString(userDto);
        mockMvc.perform(
                MockMvcRequestBuilders.put("/api/v1/users/"+ savedUser.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userDtoUpdateJson)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".firstName").value(userDto.getFirstName())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".lastName").value(userDto.getLastName())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".email").value(userDto.getEmail())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".password").value(userDto.getPassword())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".role").value(userDto.getRole())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".avatar").value(userDto.getAvatar())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".description").value(userDto.getDescription())
        );
    }

    @Test
    public void testThatPartialUpdateExistingUserReturnsHttpStatus200OK() throws Exception{
        User testUser = TestDataUtil.createdTestUserA();
        User savedUser = service.save(testUser);

        UserDto userDto = TestDataUtil.createdTestUserDtoA();
        userDto.setFirstName("UPDATED");
        String userDtoJson = mapper.writeValueAsString(userDto);
        mockMvc.perform(
                MockMvcRequestBuilders.patch("/api/v1/users/"+ savedUser.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userDtoJson)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        );
    }

    @Test
    public void testThatPartialUpdateExistingUserReturnsUpdatedUser() throws Exception{
        User testUser = TestDataUtil.createdTestUserA();
        User savedUser = service.save(testUser);

        UserDto userDto = TestDataUtil.createdTestUserDtoA();
        userDto.setFirstName("UPDATED");
        String userDtoJson = mapper.writeValueAsString(userDto);
        mockMvc.perform(
                MockMvcRequestBuilders.patch("/api/v1/users/"+ savedUser.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userDtoJson)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".firstName").value(userDto.getFirstName())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".lastName").value(userDto.getLastName())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".email").value(userDto.getEmail())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".password").value(userDto.getPassword())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".role").value(userDto.getRole())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".avatar").value(userDto.getAvatar())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".description").value(userDto.getDescription())
        );
    }

    @Test
    public void testThatDeleteUserReturnsHttpStatus404ForNonExistingUser() throws Exception{
        mockMvc.perform(
                MockMvcRequestBuilders.delete("/api/v1/users/83d70697-4b1f-4055-ab20-0d375f88f173")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isNotFound()
        );
    }

    @Test
    public void testThatDeleteUserReturnsHttpStatus204ForExistingUser() throws Exception{
        User testUser = TestDataUtil.createdTestUserA();
        User savedUser = service.save(testUser);

        mockMvc.perform(
                MockMvcRequestBuilders.delete("/api/v1/users/" + savedUser.getId())
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isNoContent()
        );
    }



}
