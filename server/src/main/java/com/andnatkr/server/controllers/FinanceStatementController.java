package com.andnatkr.server.controllers;

import com.andnatkr.server.domain.dto.FinanceStatementDto;
import com.andnatkr.server.domain.entities.FinanceStatement;
import com.andnatkr.server.mappers.Mapper;
import com.andnatkr.server.services.FinanceStatementService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class FinanceStatementController {
    private final FinanceStatementService financeStatementService;
    private final Mapper<FinanceStatement, FinanceStatementDto> financeStatementMapper;

    public FinanceStatementController(FinanceStatementService financeStatementService, Mapper<FinanceStatement, FinanceStatementDto> financeStatementMapper) {
        this.financeStatementService = financeStatementService;
        this.financeStatementMapper = financeStatementMapper;
    }

    @PostMapping(path = "/finance-statements")
    public ResponseEntity<FinanceStatementDto> createdFinanceStatement(@RequestBody FinanceStatementDto financeStatement){
        FinanceStatement financeStatementEntity = financeStatementMapper.mapFrom(financeStatement);
        FinanceStatement savedFinanceStatementEntity = financeStatementService.save(financeStatementEntity);
        return new ResponseEntity<>(
                financeStatementMapper.mapTo(savedFinanceStatementEntity),
                HttpStatus.CREATED
        );
    }

    @GetMapping(path = "/finance-statements")
    public List<FinanceStatementDto> financeStatementList(){
        List<FinanceStatement> financeStatements = financeStatementService.findAll();
        return financeStatements.stream()
                .map(financeStatementMapper::mapTo)
                .collect(Collectors.toList());
    }

}
