package com.example.wayme_backend.controller;

import com.example.wayme_backend.entity.TestStatistics;
import com.example.wayme_backend.service.TestStatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/statistics")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TestStatisticsController {
    
    private final TestStatisticsService service;
    
    @PostMapping("/increment-users")
    public ResponseEntity<Long> incrementTestUsers() {
        TestStatistics stats = service.incrementTestUsers();
        return ResponseEntity.ok(stats.getValue());
    }
    
    @GetMapping("/user-count")
    public ResponseEntity<Long> getUserCount() {
        Long count = service.getTestUserCount();
        return ResponseEntity.ok(count);
    }
    
    @GetMapping("/{type}")
    public ResponseEntity<TestStatistics> getStatistic(@PathVariable String type) {
        TestStatistics stats = service.getStatistics(type);
        return ResponseEntity.ok(stats);
    }
    
    @PostMapping("/reset-users")
    public ResponseEntity<Long> resetUserCount() {
        Long count = service.resetUserCount();
        return ResponseEntity.ok(count);
    }
    
    @GetMapping("/reset-users")
    public ResponseEntity<Long> resetUserCountGet() {
        Long count = service.resetUserCount();
        return ResponseEntity.ok(count);
    }
}
