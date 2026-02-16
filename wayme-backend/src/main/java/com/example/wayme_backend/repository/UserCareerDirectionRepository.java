package com.example.wayme_backend.repository;

import com.example.wayme_backend.entity.UserCareerDirection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserCareerDirectionRepository extends JpaRepository<UserCareerDirection, Long> {
    Optional<UserCareerDirection> findByPersonalInfo_Id(Long personalInfoId);
    List<UserCareerDirection> findAllByPersonalInfo_Id(Long personalInfoId);
}
