package com.example.wayme_backend.repository;

import com.example.wayme_backend.entity.CareerDirection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CareerDirectionRepository extends JpaRepository<CareerDirection, Long> {
    Optional<CareerDirection> findByDirectionId(String directionId);
}
