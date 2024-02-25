package com.andnatkr.server.domain.entities.estate;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "estates")
public class Estate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer dep_number;
    private String description;
    private String address;
    private String comments;

    @OneToMany(mappedBy = "estate", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EstateMgmt> estateMgmtList;
}
