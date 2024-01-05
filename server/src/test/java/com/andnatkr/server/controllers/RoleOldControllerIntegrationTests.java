//package com.andnatkr.server.controllers;
//
//import com.andnatkr.server.TestDataUtil;
//import com.andnatkr.server.domain.entities.RoleOld;
//import com.andnatkr.server.services.RoleService;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.MediaType;
//import org.springframework.test.annotation.DirtiesContext;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
//
//@SpringBootTest
//@ExtendWith(SpringExtension.class)
//@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
//@AutoConfigureMockMvc
//public class RoleOldControllerIntegrationTests {
//
//    private final RoleService roleService;
//    private final MockMvc mockMvc;
//    private final ObjectMapper objectMapper;
//
//    @Autowired
//    public RoleOldControllerIntegrationTests(RoleService roleService, MockMvc mockMvc) {
//        this.roleService = roleService;
//        this.mockMvc = mockMvc;
//        this.objectMapper = new ObjectMapper();
//    }
//
//    @Test
//    public void testThatCreateRoleSuccessfullyReturnsHttp201Created() throws Exception{
//        RoleOld testRoleAdminOld = TestDataUtil.createdTestRoleAdmin();
//        String roleJson = objectMapper.writeValueAsString(testRoleAdminOld);
//        mockMvc.perform(
//                MockMvcRequestBuilders.post("/api/v1/roles")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(roleJson)
//        ).andExpect(
//                MockMvcResultMatchers.status().isCreated()
//        );
//    }
//
//    @Test
//    public void testThatCreateRolesSuccessfullyReturnsSavedRole() throws Exception {
//        RoleOld testRoleAdminOld = TestDataUtil.createdTestRoleAdmin();
//        String roleJson = objectMapper.writeValueAsString(testRoleAdminOld);
//        mockMvc.perform(
//                MockMvcRequestBuilders.post("/api/v1/roles")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(roleJson)
//        ).andExpect(
//                MockMvcResultMatchers.status().isCreated()
//        ).andExpect(
//                MockMvcResultMatchers.jsonPath(".id").value(testRoleAdminOld.getId())
//        ).andExpect(
//                MockMvcResultMatchers.jsonPath(".description").value(testRoleAdminOld.getDescription())
//        );
//    }
//
//    @Test
//    public void testThatListRolesAuthorsReturnsHttpStatus200() throws Exception {
//        mockMvc.perform(
//                MockMvcRequestBuilders.get("/api/v1/roles")
//                        .contentType(MediaType.APPLICATION_JSON)
//        ).andExpect(
//                MockMvcResultMatchers.status().isOk()
//        );
//    }
//    @Test
//    public void testThatListRolesSuccessfullyReturnsListOfRole() throws Exception {
//        RoleOld testRoleAdminOld = TestDataUtil.createdTestRoleAdmin();
//        roleService.save(testRoleAdminOld);
//        mockMvc.perform(
//                MockMvcRequestBuilders.get("/api/v1/roles")
//                        .contentType(MediaType.APPLICATION_JSON)
//
//        ).andExpect(
//                MockMvcResultMatchers.status().isOk()
//        ).andExpect(
//                MockMvcResultMatchers.jsonPath("$[0].id").value("255")
//        ).andExpect(
//                MockMvcResultMatchers.jsonPath("$[0].description").value("admin")
//        );
//    }
//
//}
