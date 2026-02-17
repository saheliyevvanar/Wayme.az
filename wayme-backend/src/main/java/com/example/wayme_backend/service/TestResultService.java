package com.example.wayme_backend.service;

import com.example.wayme_backend.dto.TestResultDTO;
import com.example.wayme_backend.dto.SubmitTestRequest;
import com.example.wayme_backend.entity.TestResult;
import com.example.wayme_backend.repository.TestResultRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TestResultService {

    @Autowired
    private TestResultRepository testResultRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Submit test answers and save result
     */
    public TestResultDTO submitTest(SubmitTestRequest request) {
        try {
            System.out.println("Submitting test for personalInfoId: " + request.getPersonalInfoId());

            // Convert answers map to JSON string
            String answersJson = objectMapper.writeValueAsString(request.getAnswers());

            // Find existing test result or create new
            TestResult testResult = testResultRepository
                    .findByPersonalInfoId(request.getPersonalInfoId())
                    .orElse(new TestResult());

            testResult.setPersonalInfoId(request.getPersonalInfoId());
            testResult.setTotalQuestions(request.getTotalQuestions());
            testResult.setCorrectAnswers(request.getCorrectAnswers());
            testResult.setScorePercentage(request.getScorePercentage());
            testResult.setAnswersJson(answersJson);

            TestResult saved = testResultRepository.save(testResult);
            System.out.println("Test result saved with ID: " + saved.getId());

            return convertToDTO(saved);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error submitting test: " + e.getMessage());
        }
    }

    /**
     * Get test result by personal info ID
     */
    public TestResultDTO getTestResult(Long personalInfoId) {
        return testResultRepository.findByPersonalInfoId(personalInfoId)
                .map(this::convertToDTO)
                .orElse(null);
    }

    /**
     * Get all test results for a user
     */
    public List<TestResultDTO> getAllTestResults(Long personalInfoId) {
        return testResultRepository.findAllByPersonalInfoId(personalInfoId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Convert TestResult entity to DTO
     */
    private TestResultDTO convertToDTO(TestResult testResult) {
        TestResultDTO dto = new TestResultDTO();
        dto.setId(testResult.getId());
        dto.setPersonalInfoId(testResult.getPersonalInfoId());
        dto.setCategoryTitle(testResult.getCategoryTitle());
        dto.setSubCategoryTitle(testResult.getSubCategoryTitle());
        dto.setTotalQuestions(testResult.getTotalQuestions());
        dto.setCorrectAnswers(testResult.getCorrectAnswers());
        dto.setScorePercentage(testResult.getScorePercentage());
        dto.setAnswersJson(testResult.getAnswersJson());
        dto.setCreatedAt(testResult.getCreatedAt());
        dto.setUpdatedAt(testResult.getUpdatedAt());
        return dto;
    }
}
