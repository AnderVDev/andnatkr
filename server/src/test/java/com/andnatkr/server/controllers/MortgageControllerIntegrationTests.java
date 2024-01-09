package com.andnatkr.server.controllers;

import com.andnatkr.server.TestDataUtil;
import com.andnatkr.server.domain.dto.MortgageDto;
import com.andnatkr.server.domain.entities.EstateMgmt;
import com.andnatkr.server.domain.entities.Mortgage;
import com.andnatkr.server.services.MortgageService;
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
public class MortgageControllerIntegrationTests {
    private final MortgageService service;
    private final MockMvc mockMvc;
    private final ObjectMapper mapper;

    @Autowired
    public MortgageControllerIntegrationTests(MortgageService service, MockMvc mockMvc) {
        this.service = service;
        this.mockMvc = mockMvc;
        this.mapper = new ObjectMapper();
    }

    @Test
    public void testThatCreateEntrySuccessfullyReturnsHttp201Entry() throws Exception{
        Mortgage entry = TestDataUtil.createdMortgageEntryA();
        String entryJson = mapper.writeValueAsString(entry);
        mockMvc.perform(
                MockMvcRequestBuilders.post("/api/v1/mortgages")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(entryJson)
        ).andExpect(
                MockMvcResultMatchers.status().isCreated()
        );
    }

    @Test
    public void testThatCreateEntrySuccessfullyReturnsSavedEntry() throws Exception {
        Mortgage entry = TestDataUtil.createdMortgageEntryA();
        String entryJson = mapper.writeValueAsString(entry);

        mockMvc.perform(
                MockMvcRequestBuilders.post("/api/v1/mortgages")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(entryJson)
        ).andExpect(
                MockMvcResultMatchers.status().isCreated()
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".user").value(entry.getUser())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".estate").value(entry.getEstate())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".installment_number").value(entry.getInstallment_number())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".month").value(entry.getMonth())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".year").value(entry.getYear())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".uf").value(entry.getUf())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".clp").value(entry.getClp())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".comments").value(entry.getComments())
        );
    }

    @Test
    public void testThatListEntriesReturnsHttpStatus200OK() throws Exception{
        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/v1/mortgages")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        );
    }

    @Test
    public void testThatListEntriesSuccessfullyReturnsListOfEntries() throws Exception {
        Mortgage entry = TestDataUtil.createdMortgageEntryA();
        service.save(entry);

        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/v1/mortgages")
                        .contentType(MediaType.APPLICATION_JSON)

        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$[0].user").value(entry.getUser())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$[0].estate").value(entry.getEstate())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$[0].installment_number").value(entry.getInstallment_number())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$[0].month").value(entry.getMonth())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$[0].year").value(entry.getYear())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$[0].uf").value(entry.getUf())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$[0].clp").value(entry.getClp())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$[0].comments").value(entry.getComments())
        );
    }

    @Test
    public void testThatGetEntryReturnsHttpStatus404WhenNoEntryExists() throws Exception {
        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/v1/mortgages/777")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isNotFound()
        );
    }

    @Test
    public void testThatGetEntryReturnsHttpStatus200WhenEntryExists() throws  Exception{
        Mortgage entry = TestDataUtil.createdMortgageEntryA();
        service.save(entry);

        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/v1/mortgages/" + entry.getId())
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        );
    }

    @Test
    public void testThatGetEntryReturnsEntryWhenEntryExists() throws Exception {
        Mortgage entry = TestDataUtil.createdMortgageEntryA();
        service.save(entry);

        mockMvc.perform(
                MockMvcRequestBuilders.get("/api/v1/mortgages/" + entry.getId())
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".user").value(entry.getUser())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".estate").value(entry.getEstate())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".installment_number").value(entry.getInstallment_number())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".month").value(entry.getMonth())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".year").value(entry.getYear())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".uf").value(entry.getUf())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".clp").value(entry.getClp())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".comments").value(entry.getComments())
        );
    }

    @Test
    public void testThatFullUpdateEntryReturnsHttpStatus404WhenNoEntryExists() throws Exception {
        Mortgage entry = TestDataUtil.createdMortgageEntryA();
        String entryJson = mapper.writeValueAsString(entry);
        mockMvc.perform(
                MockMvcRequestBuilders.put("/api/v1/mortgages/777")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(entryJson)
        ).andExpect(
                MockMvcResultMatchers.status().isNotFound()
        );
    }

    @Test
    public void testThatFullUpdateEntryReturnsHttpStatus200WhenEntryExists() throws Exception {
        Mortgage entry = TestDataUtil.createdMortgageEntryA();
        Mortgage savedEntry = service.save(entry);
        Mortgage entryB = TestDataUtil.createdMortgageEntryB();
        String entryJson = mapper.writeValueAsString(entryB);
        mockMvc.perform(
                MockMvcRequestBuilders.put("/api/v1/mortgages/" + savedEntry.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(entryJson)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        );
    }

    @Test
    public void testThatFullUpdateEntryReturnsUpdatesEntryWhenEntryExists() throws Exception {
        Mortgage entry = TestDataUtil.createdMortgageEntryA();
        Mortgage savedEntry = service.save(entry);
        Mortgage entryB = TestDataUtil.createdMortgageEntryB();
        String entryJson = mapper.writeValueAsString(entryB);
        mockMvc.perform(
                MockMvcRequestBuilders.put("/api/v1/mortgages/" + savedEntry.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(entryJson)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".user").value(entryB.getUser())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".estate").value(entryB.getEstate())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".installment_number").value(entryB.getInstallment_number())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".month").value(entryB.getMonth())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".year").value(entryB.getYear())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".uf").value(entryB.getUf())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".clp").value(entryB.getClp())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".comments").value(entryB.getComments())
        );
    }

    @Test
    public void testThatPartialUpdateEntryReturnsHttpStatus200OKWhenEntryExists() throws Exception {
        Mortgage entry = TestDataUtil.createdMortgageEntryA();
        Mortgage savedEntry = service.save(entry);
        MortgageDto mortgageDto = TestDataUtil.createdMortgageEntryDtoA();
        mortgageDto.setComments("UPDATED");
        String entryJson = mapper.writeValueAsString(mortgageDto);
        mockMvc.perform(
                MockMvcRequestBuilders.patch("/api/v1/mortgages/" + savedEntry.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(entryJson)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        );
    }

    @Test
    public void testThatPartialUpdateExistingEntryReturnsUpdatedEntry() throws Exception {
        Mortgage entry = TestDataUtil.createdMortgageEntryA();
        Mortgage savedEntry = service.save(entry);
        MortgageDto mortgageDto = TestDataUtil.createdMortgageEntryDtoA();
        mortgageDto.setComments("UPDATED");
        String entryJson = mapper.writeValueAsString(mortgageDto);
        mockMvc.perform(
                MockMvcRequestBuilders.patch("/api/v1/mortgages/" + savedEntry.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(entryJson)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".user").value(mortgageDto.getUser())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".estate").value(mortgageDto.getEstate())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".installment_number").value(mortgageDto.getInstallment_number())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".month").value(mortgageDto.getMonth())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".year").value(mortgageDto.getYear())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".uf").value(mortgageDto.getUf())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".clp").value(mortgageDto.getClp())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".comments").value(mortgageDto.getComments())
        );
    }

    @Test
    public void testThatDeleteEntryReturnsHttpStatus404ForNonExistingEntry() throws Exception{
        mockMvc.perform(
                MockMvcRequestBuilders.delete("/api/v1/mortgages/777")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isNotFound()
        );
    }

    @Test
    public void testThatDeleteEntryReturnsHttpStatus204ForExistingEntry() throws Exception{
        Mortgage entry = TestDataUtil.createdMortgageEntryA();
        Mortgage savedEntry = service.save(entry);

        mockMvc.perform(
                MockMvcRequestBuilders.delete("/api/v1/mortgages/" + savedEntry.getId())
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isNoContent()
        );
    }

}
