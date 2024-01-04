package com.andnatkr.server.controllers;

import com.andnatkr.server.TestDataUtil;
import com.andnatkr.server.domain.entities.FinanceStatement;
import com.andnatkr.server.services.FinanceStatementService;
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
public class FinanceStatementControllerIntegrationTests {
    private final FinanceStatementService statementService;
    private final MockMvc mockMvc;
    private final ObjectMapper objectMapper;

    @Autowired
    public FinanceStatementControllerIntegrationTests(FinanceStatementService statementService, MockMvc mockMvc) {
        this.statementService = statementService;
        this.mockMvc = mockMvc;
        this.objectMapper = new ObjectMapper();
    }

    @Test
    public void testThatCreateFinanceStatementSuccessFullyReturnsHttp201Created() throws Exception{
        FinanceStatement statement = TestDataUtil.createdFinanceStatementA();
        String statementJson = objectMapper.writeValueAsString(statement);
        mockMvc.perform(
                MockMvcRequestBuilders.post("/finance-statements")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(statementJson)
        ).andExpect(
                MockMvcResultMatchers.status().isCreated()
        );
    }

    @Test
    public void testThatCreateFinanceStatementSuccessFullyReturnsSavedUser() throws Exception{
        FinanceStatement statement = TestDataUtil.createdFinanceStatementA();
        String statementJson = objectMapper.writeValueAsString(statement);
        mockMvc.perform(
                MockMvcRequestBuilders.post("/finance-statements")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(statementJson)
        ).andExpect(
                MockMvcResultMatchers.status().isCreated()
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".id").value(statement.getId())
        ).andExpect(
                MockMvcResultMatchers.jsonPath(".description").value(statement.getDescription())
        );
    }

    @Test
    public void testThatListFinanceStatementsReturnsHttpStatus200() throws Exception {
        mockMvc.perform(
                MockMvcRequestBuilders.get("/finance-statements")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        );
    }

    @Test
    public void testThatListUsersSuccessfullyReturnsListOfUsers() throws Exception {
        FinanceStatement statement = TestDataUtil.createdFinanceStatementA();
        statementService.save(statement);
        mockMvc.perform(
                MockMvcRequestBuilders.get("/finance-statements")
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(
                MockMvcResultMatchers.status().isOk()
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$[0].id").value(statement.getId())
        ).andExpect(
                MockMvcResultMatchers.jsonPath("$[0].description").value(statement.getDescription())
        );
    }

}
