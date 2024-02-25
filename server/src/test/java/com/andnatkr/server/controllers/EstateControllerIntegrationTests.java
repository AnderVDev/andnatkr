package com.andnatkr.server.controllers;

import com.andnatkr.server.TestDataUtil;
import com.andnatkr.server.domain.dto.estate.EstateDto;
import com.andnatkr.server.domain.entities.estate.Estate;
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
    private final EstateService service;
    private final MockMvc mockMvc;
    private final ObjectMapper mapper;

    @Autowired
    public EstateControllerIntegrationTests(EstateService service, MockMvc mockMvc) {
        this.service = service;
        this.mockMvc = mockMvc;
        this.mapper = new ObjectMapper();
    }

    @Test
    public void testThatCreateEstateSuccessFullyReturnsHttp201Created() throws Exception{
        Estate estate = TestDataUtil.createdEstateA();
        String estateJson = mapper.writeValueAsString(estate);
        mockMvc.perform(
                MockMvcRequestBuilders.post("/api/v1/estates")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(estateJson)
        ).andExpect(
                MockMvcResultMatchers.status().isCreated()
        );
    }

    @Test
    public void testThatCreateEstateSuccessFullyReturnsSavedEstate() throws Exception{
        Estate estate = TestDataUtil.createdEstateA();
        String estateJson = mapper.writeValueAsString(estate);
        mockMvc.perform(
                MockMvcRequestBuilders.post("/api/v1/estates")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(estateJson)
        ).andExpect(
                MockMvcResultMatchers.status().isCreated()
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".id").value(1)
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".dep_number").value(estate.getDep_number())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".description").value(estate.getDescription())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".comments").value(estate.getComments())
        );
    }

    @Test
    public void testThatListEstatesReturnsHttpStatus200() throws Exception {
        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/v1/estates")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        );
    }

    @Test
    public void testThatListEstatesSuccessfullyReturnsListOfEstates() throws Exception {
        Estate estate = TestDataUtil.createdEstateA();
        service.save(estate);
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
        ).andExpect(
                MockMvcResultMatchers.jsonPath("[0].comments").value(estate.getComments())
        );
    }

    @Test
    public void testThatGetEstateReturnsHttpStatus200WhenEstateExists() throws Exception {
        Estate estate = TestDataUtil.createdEstateA();
        service.save(estate);
        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/v1/estates/" + estate.getId())
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        );
    }

    @Test
    public void testThatGetUserReturnsUserWhenUserExists() throws Exception {
        Estate estate = TestDataUtil.createdEstateA();
        service.save(estate);
        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/v1/estates/" + estate.getId())
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".id").value(estate.getId())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".dep_number").value(estate.getDep_number())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".description").value(estate.getDescription())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".comments").value(estate.getComments())
        );
    }

    @Test
    public void testThatGetEstateReturnsHttpStatus404WhenNoEstateExists() throws Exception {
        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/v1/estates/777")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isNotFound()
        );
    }

    @Test
    public void testThatFullUpdateEstateReturnsHttpStatus404WhenNoEstateExists() throws Exception {
        EstateDto estateDto = TestDataUtil.createdEstateDtoA();
        String estateDtoJson = mapper.writeValueAsString(estateDto);
        mockMvc.perform(
                MockMvcRequestBuilders.put("/api/v1/estates/777")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(estateDtoJson)
        ).andExpect(
                MockMvcResultMatchers.status().isNotFound()
        );
    }

    @Test
    public void testThatFullUpdateEstateReturnsHttpStatus200WhenEstateExists() throws Exception {
        Estate estate = TestDataUtil.createdEstateA();
        Estate savedEstate = service.save(estate);

        EstateDto estateDto = TestDataUtil.createdEstateDtoA();
        String estateDtoJson = mapper.writeValueAsString(estateDto);
        mockMvc.perform(
                MockMvcRequestBuilders.put("/api/v1/estates/"+ savedEstate.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(estateDtoJson)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        );
    }

    @Test
    public void testThatFullUpdateUpdatesExistingEstate() throws Exception {
        Estate estate = TestDataUtil.createdEstateA();
        Estate savedEstate = service.save(estate);

        EstateDto estateDto = TestDataUtil.createdEstateDtoB();
        estateDto.setId(estate.getId());
        String estateDtoJson = mapper.writeValueAsString(estateDto);
        mockMvc.perform(
                MockMvcRequestBuilders.put("/api/v1/estates/"+ savedEstate.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(estateDtoJson)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".id").value(estate.getId())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".dep_number").value(estateDto.getDep_number())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".description").value(estateDto.getDescription())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".comments").value(estateDto.getComments())
        );
    }

    @Test
    public void testThatPartialUpdateExistingEstateReturnsHttpStatus200OK() throws Exception{
        Estate estate = TestDataUtil.createdEstateA();
        Estate savedEstate = service.save(estate);

        EstateDto estateDto = TestDataUtil.createdEstateDtoA();
        estateDto.setDescription("UPDATED");
        String estateDtoJson = mapper.writeValueAsString(estateDto);
        mockMvc.perform(
                MockMvcRequestBuilders.patch("/api/v1/estates/"+ savedEstate.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(estateDtoJson)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        );
    }

    @Test
    public void testThatPartialUpdateExistingEstateReturnsUpdatedEstate() throws Exception{
        Estate estate = TestDataUtil.createdEstateA();
        Estate savedEstate = service.save(estate);

        EstateDto estateDto = TestDataUtil.createdEstateDtoA();
        estateDto.setDescription("UPDATED");
        String estateDtoJson = mapper.writeValueAsString(estateDto);
        mockMvc.perform(
                MockMvcRequestBuilders.patch("/api/v1/estates/"+ savedEstate.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(estateDtoJson)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".id").value(estate.getId())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".dep_number").value(estateDto.getDep_number())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".description").value(estateDto.getDescription())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".comments").value(estateDto.getComments())
        );
    }

    @Test
    public void testThatDeleteEstateReturnsHttpStatus204ForNonExistingEstate() throws Exception{
        mockMvc.perform(
                MockMvcRequestBuilders.delete("/api/v1/estates/777")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isNotFound()
        );
    }

    @Test
    public void testThatDeleteEstateReturnsHttpStatus204ForExistingEstate() throws Exception{
        Estate estate = TestDataUtil.createdEstateA();
        Estate savedEstate = service.save(estate);

        mockMvc.perform(
                MockMvcRequestBuilders.delete("/api/v1/estates/" + savedEstate.getId())
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isNoContent()
        );
    }






}
