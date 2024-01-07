package com.andnatkr.server.controllers;

import com.andnatkr.server.TestDataUtil;
import com.andnatkr.server.domain.entities.Estate;
import com.andnatkr.server.services.EstateService;
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
public class EstateControllerIntegrationTests {
    private final EstateService estateService;
    private final MockMvc mockMvc;
    private final ObjectMapper objectMapper;

    @Autowired
    public EstateControllerIntegrationTests(EstateService estateService, MockMvc mockMvc) {
        this.estateService = estateService;
        this.mockMvc = mockMvc;
        this.objectMapper = new ObjectMapper();
    }

    @Test
    public void testThatCreateRealEstateSuccessFullyReturnsHttp201Created() throws Exception{
        Estate estate = TestDataUtil.createdRealEstateA();
        String realEstateJson = objectMapper.writeValueAsString(estate);
        mockMvc.perform(
                MockMvcRequestBuilders.post("/api/v1/estates")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(realEstateJson)
        ).andExpect(
                MockMvcResultMatchers.status().isCreated()
        );
    }

    @Test
    public void testThatCreateRealEstateSuccessFullyReturnsSavedUser() throws Exception{
        Estate estate = TestDataUtil.createdRealEstateA();
        String realEstateJson = objectMapper.writeValueAsString(estate);
        mockMvc.perform(
                MockMvcRequestBuilders.post("/api/v1/estates")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(realEstateJson)
        ).andExpect(
                MockMvcResultMatchers.status().isCreated()
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".id").value(1)
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".dep_number").value(estate.getDep_number())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".description").value(estate.getDescription())
        );
    }

    @Test
    public void testThatListRealEstatesReturnsHttpStatus200() throws Exception {
        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/v1/estates")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        );
    }

    @Test
    public void testThatListRealEstatesSuccessfullyReturnsListOfRealEstates() throws Exception {
        Estate estate = TestDataUtil.createdRealEstateA();
        estateService.save(estate);
        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/v1/estates")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        ).andExpect(
                MockMvcResultMatchers.jsonPath("[0].id").value(1)
        ).andExpect(
                MockMvcResultMatchers.jsonPath("[0]dep_number").value(estate.getDep_number())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("[0].description").value(estate.getDescription())
        );
    }

}
