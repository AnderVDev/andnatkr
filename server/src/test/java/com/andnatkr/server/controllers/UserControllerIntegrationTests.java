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
    private final RoleService roleService;
    private final MockMvc mockMvc;
    private final ObjectMapper objectMapper;

    @Autowired
    public UserControllerIntegrationTests(UserService userService, RoleService roleService, MockMvc mockMvc) {
        this.userService = userService;
        this.roleService = roleService;
        this.mockMvc = mockMvc;
        this.objectMapper = new ObjectMapper();
    }


    @Test
    public void testThatCreateUserSuccessfullyReturnsHttp201Created() throws Exception{
        Role testRoleAdmin = TestDataUtil.createdTestRoleAdmin();
        Role savedRole = roleService.save(testRoleAdmin);

        User testUser = TestDataUtil.createdTestUserA();

        String userJson = objectMapper.writeValueAsString(testUser);

        mockMvc.perform(
                MockMvcRequestBuilders.post("/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson)
        ).andExpect(
                MockMvcResultMatchers.status().isCreated()
        );
    }
}
