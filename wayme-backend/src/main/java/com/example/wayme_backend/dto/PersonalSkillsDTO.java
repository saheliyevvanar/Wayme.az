package com.example.wayme_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonalSkillsDTO {
    private Long id;
    private String sessionId;
    private List<String> skills;
    private String createdAt;
    private String updatedAt;
}
