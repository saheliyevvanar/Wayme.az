package com.example.wayme_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonalInfoHistoryDTO {
    private Long id;
    private String sessionId;
    private String name;
    private String surname;
    private String birthDate;
    private String createdAt;
}
