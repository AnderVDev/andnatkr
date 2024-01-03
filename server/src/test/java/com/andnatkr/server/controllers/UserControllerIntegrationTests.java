package com.andnatkr.server.controllers;

import com.andnatkr.server.TestDataUtil;
import com.andnatkr.server.domain.entities.Role;
import com.andnatkr.server.domain.entities.User;
import com.andnatkr.server.services.RoleService;
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

    private final UserService userService;
    private final MockMvc mockMvc;
    private final ObjectMapper objectMapper;

    @Autowired
    public UserControllerIntegrationTests(UserService userService, MockMvc mockMvc) {
        this.userService = userService;
        this.mockMvc = mockMvc;
        this.objectMapper = new ObjectMapper();
    }


    @Test
    public void testThatCreateUserSuccessfullyReturnsHttp201Created() throws Exception{
        User testUser = TestDataUtil.createdTestUserA(null);
        String userJson = objectMapper.writeValueAsString(testUser);
        mockMvc.perform(
                MockMvcRequestBuilders.post("/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson)
        ).andExpect(
                MockMvcResultMatchers.status().isCreated()
        );
    }

    @Test
    public void testThatCreateUserSuccessfullyReturnsSavedUser() throws Exception {
        User testUser = TestDataUtil.createdTestUserA(null);
        String userJson = objectMapper.writeValueAsString(testUser);
        mockMvc.perform(
                MockMvcRequestBuilders.post("/users")
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
                MockMvcRequestBuilders.get("/users")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        );
    }

    @Test
    public void testThatListUsersSuccessfullyReturnsListOfUsers() throws Exception {
        User testUser = TestDataUtil.createdTestUserA(null);
        userService.save(testUser);
        mockMvc.perform(
                MockMvcRequestBuilders.get("/users")
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
}
