package com.example.wayme_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "test_statistics")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestStatistics {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String statisticType;
    
    @Column(nullable = false)
    private Long value = 0L;
    
    @Column(nullable = false)
    private LocalDateTime lastUpdated = LocalDateTime.now();
}
