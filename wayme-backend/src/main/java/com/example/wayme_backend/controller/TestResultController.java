package com.example.wayme_backend.controller;

import com.example.wayme_backend.dto.TestResultDTO;
import com.example.wayme_backend.dto.SubmitTestRequest;
import com.example.wayme_backend.service.TestResultService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/test-results")
@CrossOrigin(origins = "*")
public class TestResultController {

    @Autowired
    private TestResultService testResultService;

    /**
     * Submit test answers
     * POST /api/test-results/submit
     */
    @PostMapping("/submit")
    public ResponseEntity<?> submitTest(@Valid @RequestBody SubmitTestRequest request) {
        try {
            TestResultDTO result = testResultService.submitTest(request);
            Map<String, Object> response = new HashMap<>();
            response.put("id", result.getId());
            response.put("personalInfoId", result.getPersonalInfoId());
            response.put("totalQuestions", result.getTotalQuestions());
            response.put("correctAnswers", result.getCorrectAnswers());
            response.put("scorePercentage", result.getScorePercentage());
            response.put("message", "Test uğurla tamamlandı");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Get test result by personal info ID
     * GET /api/test-results/{personalInfoId}
     */
    @GetMapping("/{personalInfoId}")
    public ResponseEntity<?> getTestResult(@PathVariable Long personalInfoId) {
        try {
            TestResultDTO result = testResultService.getTestResult(personalInfoId);
            if (result != null) {
                return ResponseEntity.ok(result);
            } else {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Test nəticəsi tapılmadı");
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Get all test results for a user
     * GET /api/test-results/history/{personalInfoId}
     */
    @GetMapping("/history/{personalInfoId}")
    public ResponseEntity<?> getAllTestResults(@PathVariable Long personalInfoId) {
        try {
            List<TestResultDTO> results = testResultService.getAllTestResults(personalInfoId);
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
