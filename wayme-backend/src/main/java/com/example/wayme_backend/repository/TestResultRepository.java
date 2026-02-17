package com.example.wayme_backend.repository;

import com.example.wayme_backend.entity.TestResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TestResultRepository extends JpaRepository<TestResult, Long> {
    Optional<TestResult> findByPersonalInfoId(Long personalInfoId);
    List<TestResult> findAllByPersonalInfoId(Long personalInfoId);
}
