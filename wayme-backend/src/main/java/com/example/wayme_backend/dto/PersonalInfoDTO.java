package com.example.wayme_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonalInfoDTO {

    private Long id;
    private String sessionId;
    private String name;
    private String surname;
    private LocalDate birthDate;
    private String birthDateFormatted; // "dd.MM.yyyy" formatında
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
