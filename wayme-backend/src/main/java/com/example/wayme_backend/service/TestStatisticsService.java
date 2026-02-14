package com.example.wayme_backend.service;

import com.example.wayme_backend.entity.TestStatistics;
import com.example.wayme_backend.repository.TestStatisticsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class TestStatisticsService {
    
    private final TestStatisticsRepository repository;
    
    @Transactional
    public TestStatistics incrementTestUsers() {
        TestStatistics stats = repository.findByStatisticType("USER_COUNT")
                .orElseGet(() -> {
                    TestStatistics newStats = new TestStatistics();
                    newStats.setStatisticType("USER_COUNT");
                    newStats.setValue(0L);
                    return repository.save(newStats);
                });
        
        stats.setValue(stats.getValue() + 1);
        stats.setLastUpdated(LocalDateTime.now());
        return repository.save(stats);
    }
    
    public Long getTestUserCount() {
        return repository.findByStatisticType("USER_COUNT")
                .map(TestStatistics::getValue)
                .orElse(15L);
    }
    
    public TestStatistics getStatistics(String type) {
        return repository.findByStatisticType(type)
                .orElseGet(() -> {
                    TestStatistics newStats = new TestStatistics();
                    newStats.setStatisticType(type);
                    newStats.setValue(0L);
                    return repository.save(newStats);
                });
    }
    
    @Transactional
    public Long resetUserCount() {
        TestStatistics stats = repository.findByStatisticType("USER_COUNT")
                .orElseGet(() -> {
                    TestStatistics newStats = new TestStatistics();
                    newStats.setStatisticType("USER_COUNT");
                    newStats.setValue(0L);
                    return repository.save(newStats);
                });
        
        stats.setValue(0L);
        stats.setLastUpdated(LocalDateTime.now());
        repository.save(stats);
        return 0L;
    }
}
