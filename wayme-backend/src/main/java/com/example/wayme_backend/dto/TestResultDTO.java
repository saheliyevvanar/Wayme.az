package com.example.wayme_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestResultDTO {

    private Long id;
    private Long personalInfoId;
    private String categoryTitle;
    private String subCategoryTitle;
    private Integer totalQuestions;
    private Integer correctAnswers;
    private Double scorePercentage;
    private String answersJson;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
