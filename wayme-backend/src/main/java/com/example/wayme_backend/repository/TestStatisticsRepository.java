package com.example.wayme_backend.repository;

import com.example.wayme_backend.entity.TestStatistics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TestStatisticsRepository extends JpaRepository<TestStatistics, Long> {
    Optional<TestStatistics> findByStatisticType(String statisticType);
}
