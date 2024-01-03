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
@Table(name = "real_estates")
public class RealEstate {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "real_estates_id_seq")
    private Integer id;
    private Integer dep_number;
    private String description;
}
