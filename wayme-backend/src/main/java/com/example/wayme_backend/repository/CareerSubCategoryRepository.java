package com.example.wayme_backend.repository;

import com.example.wayme_backend.entity.CareerSubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CareerSubCategoryRepository extends JpaRepository<CareerSubCategory, Long> {
    List<CareerSubCategory> findByCareerDirection_DirectionId(String directionId);
    Optional<CareerSubCategory> findBySubCategoryId(String subCategoryId);
}
