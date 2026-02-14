package com.example.wayme_backend.repository;

import com.example.wayme_backend.entity.PersonalInfoHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonalInfoHistoryRepository extends JpaRepository<PersonalInfoHistory, Long> {
    List<PersonalInfoHistory> findBySessionIdOrderByCreatedAtDesc(String sessionId);
}
