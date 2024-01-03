package com.andnatkr.server.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "finance_statements")
public class FinanceStatements {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "finance_statements_id_seq")
    private Integer id;
    private String description;
}
