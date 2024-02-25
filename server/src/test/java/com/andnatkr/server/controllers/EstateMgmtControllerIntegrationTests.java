package com.andnatkr.server.controllers;

import com.andnatkr.server.TestDataUtil;
import com.andnatkr.server.domain.dto.estate.EstateMgmtDto;
import com.andnatkr.server.domain.entities.estate.EstateMgmt;
import com.andnatkr.server.services.EstateMgmtService;
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
public class EstateMgmtControllerIntegrationTests {
    private final EstateMgmtService service;
    private final MockMvc mockMvc;
    private final ObjectMapper mapper;

    @Autowired
    public EstateMgmtControllerIntegrationTests(EstateMgmtService service, MockMvc mockMvc) {
        this.service = service;
        this.mockMvc = mockMvc;
        this.mapper = new ObjectMapper();
    }

    @Test
    public void testThatCreateInputSuccessfullyReturnsHttp201Created() throws Exception{
        EstateMgmt input = TestDataUtil.createdEstateMgmtA();
        String inputJson = mapper.writeValueAsString(input);
        mockMvc.perform(
                MockMvcRequestBuilders.post("/api/v1/management")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(inputJson)
        ).andExpect(
                MockMvcResultMatchers.status().isCreated()
        );
    }

    @Test
    public void testThatCreateInputSuccessfullyReturnsSavedInput() throws Exception {


        EstateMgmt input = TestDataUtil.createdEstateMgmtA();
        String inputJson = mapper.writeValueAsString(input);
        mockMvc.perform(
                MockMvcRequestBuilders.post("/api/v1/management")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(inputJson)
        ).andExpect(
                MockMvcResultMatchers.status().isCreated()
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".user").value(input.getUser())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".financeStatement").value(input.getFinanceStatement())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".estate").value(input.getEstate())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".amount").value(input.getAmount())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".month").value(input.getMonth())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".year").value(input.getYear())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".detail").value(input.getDetail())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".comments").value(input.getComments())
        );
    }

    @Test
    public void testThatListInputReturnsHttpStatus200OK() throws Exception{
        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/v1/management")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        );
    }

    @Test
    public void testThatListInputsSuccessfullyReturnsListOfInputs() throws Exception {
        EstateMgmt input = TestDataUtil.createdEstateMgmtA();
        service.save(input);

        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/v1/management")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$[0].user").value(input.getUser())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$[0].financeStatement").value(input.getFinanceStatement())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$[0].estate").value(input.getEstate())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$[0].amount").value(input.getAmount())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$[0].month").value(input.getMonth())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$[0].year").value(input.getYear())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$[0].detail").value(input.getDetail())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$[0].comments").value(input.getComments())
        );
    }

    @Test
    public void testThatGetInputReturnsHttpStatus404WhenNoInputExists() throws Exception {
        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/v1/management/777")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isNotFound()
        );
    }

    @Test
    public void testThatGetInputReturnsHttpStatus200WhenInputExists() throws  Exception{
        EstateMgmt input = TestDataUtil.createdEstateMgmtA();
        service.save(input);

        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/v1/management/" + input.getId())
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        );
    }

    @Test
    public void testThatGetInputReturnsInputWhenInputExists() throws Exception {
        EstateMgmt input = TestDataUtil.createdEstateMgmtA();
        service.save(input);

        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/v1/management/" + input.getId())
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".user").value(input.getUser())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".financeStatement").value(input.getFinanceStatement())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".estate").value(input.getEstate())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".amount").value(input.getAmount())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".month").value(input.getMonth())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".year").value(input.getYear())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".detail").value(input.getDetail())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".comments").value(input.getComments())
        );
    }

    @Test
    public void testThatFullUpdateInputReturnsHttpStatus404WhenNoInputExists() throws Exception {

        EstateMgmt input = TestDataUtil.createdEstateMgmtA();
        String inputJson = mapper.writeValueAsString(input);
        mockMvc.perform(
                MockMvcRequestBuilders.put("/api/v1/management/777")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(inputJson)
        ).andExpect(
                MockMvcResultMatchers.status().isNotFound()
        );
    }

    @Test
    public void testThatFullUpdateInputReturnsHttpStatus200WhenInputExists() throws Exception {
        EstateMgmt input = TestDataUtil.createdEstateMgmtA();
        EstateMgmt savedInput = service.save(input);

        EstateMgmt inputB = TestDataUtil.createdEstateMgmtB();
        String inputJson = mapper.writeValueAsString(inputB);
        mockMvc.perform(
                MockMvcRequestBuilders.put("/api/v1/management/" + savedInput.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(inputJson)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        );
    }

    @Test
    public void testThatFullUpdateReturnsUpdatesInputWhenInputExists() throws Exception {
        EstateMgmt input = TestDataUtil.createdEstateMgmtA();
        EstateMgmt savedInput = service.save(input);

        EstateMgmt inputB = TestDataUtil.createdEstateMgmtB();
        String inputJson = mapper.writeValueAsString(inputB);

        mockMvc.perform(
                MockMvcRequestBuilders.put("/api/v1/management/" + savedInput.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(inputJson)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".user").value(inputB.getUser())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".financeStatement").value(inputB.getFinanceStatement())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".estate").value(inputB.getEstate())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".amount").value(inputB.getAmount())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".month").value(inputB.getMonth())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".year").value(inputB.getYear())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".detail").value(inputB.getDetail())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".comments").value(inputB.getComments())
        );
    }

    @Test
    public void testThatPartialUpdateExistingInputReturnsHttpStatus200OK() throws Exception{
        EstateMgmt input = TestDataUtil.createdEstateMgmtA();
        EstateMgmt savedInput = service.save(input);

        EstateMgmtDto inputDto = TestDataUtil.createdEstateMgmtDtoA();
        inputDto.setComments("UPDATED");
        String inputDtoJson = mapper.writeValueAsString(inputDto);
        mockMvc.perform(
                MockMvcRequestBuilders.patch("/api/v1/management/"+ savedInput.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(inputDtoJson)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        );
    }

    @Test
    public void testThatPartialUpdateExistingInputReturnsUpdatedInput() throws Exception{
        EstateMgmt input = TestDataUtil.createdEstateMgmtA();
        EstateMgmt savedInput = service.save(input);

        EstateMgmtDto inputDto = TestDataUtil.createdEstateMgmtDtoA();
        inputDto.setComments("UPDATED");
        String inputDtoJson = mapper.writeValueAsString(inputDto);
        mockMvc.perform(
                MockMvcRequestBuilders.patch("/api/v1/management/"+ savedInput.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(inputDtoJson)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".user").value(input.getUser())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".financeStatement").value(inputDto.getFinanceStatement())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".estate").value(inputDto.getEstate())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".amount").value(inputDto.getAmount())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".month").value(inputDto.getMonth())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".year").value(inputDto.getYear())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".detail").value(inputDto.getDetail())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".comments").value(inputDto.getComments())
        );
    }

    @Test
    public void testThatDeleteInputReturnsHttpStatus404ForNonExistingInput() throws Exception{
        mockMvc.perform(
                MockMvcRequestBuilders.delete("/api/v1/management/777")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isNotFound()
        );
    }

    @Test
    public void testThatDeleteInputReturnsHttpStatus204ForExistingInput() throws Exception{
        EstateMgmt input = TestDataUtil.createdEstateMgmtA();
        EstateMgmt savedInput = service.save(input);

        mockMvc.perform(
                MockMvcRequestBuilders.delete("/api/v1/management/" + savedInput.getId())
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isNoContent()
        );
    }



}
