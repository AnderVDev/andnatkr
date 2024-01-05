package com.andnatkr.server.controllers;

import com.andnatkr.server.TestDataUtil;
import com.andnatkr.server.domain.entities.RealEstate;
import com.andnatkr.server.services.RealEstateService;
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
public class RealEstateControllerIntegrationTests {
    private final RealEstateService realEstateService;
    private final MockMvc mockMvc;
    private final ObjectMapper objectMapper;

    @Autowired
    public RealEstateControllerIntegrationTests(RealEstateService realEstateService, MockMvc mockMvc) {
        this.realEstateService = realEstateService;
        this.mockMvc = mockMvc;
        this.objectMapper = new ObjectMapper();
    }

    @Test
    public void testThatCreateRealEstateSuccessFullyReturnsHttp201Created() throws Exception{
        RealEstate realEstate = TestDataUtil.createdRealEstateA();
        String realEstateJson = objectMapper.writeValueAsString(realEstate);
        mockMvc.perform(
                MockMvcRequestBuilders.post("/real-estates")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(realEstateJson)
        ).andExpect(
                MockMvcResultMatchers.status().isCreated()
        );
    }

    @Test
    public void testThatCreateRealEstateSuccessFullyReturnsSavedUser() throws Exception{
        RealEstate realEstate = TestDataUtil.createdRealEstateA();
        String realEstateJson = objectMapper.writeValueAsString(realEstate);
        mockMvc.perform(
                MockMvcRequestBuilders.post("/real-estates")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(realEstateJson)
        ).andExpect(
                MockMvcResultMatchers.status().isCreated()
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".id").value(1)
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".dep_number").value(realEstate.getDep_number())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".description").value(realEstate.getDescription())
        );
    }

    @Test
    public void testThatListRealEstatesReturnsHttpStatus200() throws Exception {
        mockMvc.perform(
                MockMvcRequestBuilders.get("/real-estates")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        );
    }

    @Test
    public void testThatListRealEstatesSuccessfullyReturnsListOfRealEstates() throws Exception {
        RealEstate realEstate = TestDataUtil.createdRealEstateA();
        realEstateService.save(realEstate);
        mockMvc.perform(
                MockMvcRequestBuilders.get("/real-estates")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        ).andExpect(
                MockMvcResultMatchers.jsonPath("[0].id").value(1)
        ).andExpect(
                MockMvcResultMatchers.jsonPath("[0]dep_number").value(realEstate.getDep_number())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("[0].description").value(realEstate.getDescription())
        );
    }

}
