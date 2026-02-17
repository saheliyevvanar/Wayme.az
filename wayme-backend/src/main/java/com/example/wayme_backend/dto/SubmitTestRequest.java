package com.example.wayme_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubmitTestRequest {

    private Long personalInfoId;
    private Map<Integer, String> answers; // {"questionId": "optionId"}
    private Integer totalQuestions;
    private Integer correctAnswers;
    private Double scorePercentage;
}
