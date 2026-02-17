package com.example.wayme_backend.repository;

import com.example.wayme_backend.entity.UserCareerChoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserCareerChoiceRepository extends JpaRepository<UserCareerChoice, Long> {
    Optional<UserCareerChoice> findByPersonalInfoId(Long personalInfoId);
}
