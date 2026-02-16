package com.example.wayme_backend.service;

import com.example.wayme_backend.dto.CareerDirectionDTO;
import com.example.wayme_backend.dto.CareerSubCategoryDTO;
import com.example.wayme_backend.entity.*;
import com.example.wayme_backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CareerDirectionService {

    @Autowired
    private CareerDirectionRepository careerDirectionRepository;

    @Autowired
    private CareerSubCategoryRepository careerSubCategoryRepository;

    @Autowired
    private UserCareerDirectionRepository userCareerDirectionRepository;

    @Autowired
    private PersonalInfoRepository personalInfoRepository;

    /**
     * Get all career directions
     */
    public List<CareerDirectionDTO> getAllCareerDirections() {
        List<CareerDirection> directions = careerDirectionRepository.findAll();
        return directions.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get a specific career direction with its sub-categories
     */
    public CareerDirectionDTO getCareerDirectionWithSubCategories(String directionId) {
        CareerDirection direction = careerDirectionRepository.findByDirectionId(directionId)
                .orElseThrow(() -> new RuntimeException("Career direction not found: " + directionId));

        List<CareerSubCategory> subCategories = careerSubCategoryRepository
                .findByCareerDirection_DirectionId(directionId);

        CareerDirectionDTO dto = convertToDTO(direction);
        dto.setSubCategories(
                subCategories.stream()
                        .map(this::convertSubCategoryToDTO)
                        .collect(Collectors.toList())
        );
        return dto;
    }

    /**
     * Save user's career direction choice
     */
    public UserCareerDirection saveUserCareerDirection(Long personalInfoId, String directionId, String subCategoryId) {
        PersonalInfo personalInfo = personalInfoRepository.findById(personalInfoId)
                .orElseThrow(() -> new RuntimeException("Personal info not found: " + personalInfoId));

        CareerDirection careerDirection = careerDirectionRepository.findByDirectionId(directionId)
                .orElseThrow(() -> new RuntimeException("Career direction not found: " + directionId));

        // Find existing user career direction
        UserCareerDirection userCareerDirection = userCareerDirectionRepository
                .findByPersonalInfo_Id(personalInfoId)
                .orElse(new UserCareerDirection());

        userCareerDirection.setPersonalInfo(personalInfo);
        userCareerDirection.setCareerDirection(careerDirection);

        // Set sub-category if provided
        if (subCategoryId != null && !subCategoryId.isEmpty()) {
            CareerSubCategory subCategory = careerSubCategoryRepository.findBySubCategoryId(subCategoryId)
                    .orElseThrow(() -> new RuntimeException("Sub-category not found: " + subCategoryId));
            userCareerDirection.setCareerSubCategory(subCategory);
        }

        return userCareerDirectionRepository.save(userCareerDirection);
    }

    /**
     * Get user's career direction
     */
    public UserCareerDirection getUserCareerDirection(Long personalInfoId) {
        return userCareerDirectionRepository.findByPersonalInfo_Id(personalInfoId)
                .orElse(null);
    }

    // Helper methods
    private CareerDirectionDTO convertToDTO(CareerDirection direction) {
        CareerDirectionDTO dto = new CareerDirectionDTO();
        dto.setId(direction.getId());
        dto.setDirectionId(direction.getDirectionId());
        dto.setTitle(direction.getTitle());
        dto.setDescription(direction.getDescription());
        dto.setIcon(direction.getIcon());
        dto.setColor(direction.getColor());
        dto.setBg(direction.getBg());
        dto.setBorder(direction.getBorder());
        dto.setCreatedAt(direction.getCreatedAt());
        return dto;
    }

    private CareerSubCategoryDTO convertSubCategoryToDTO(CareerSubCategory subCategory) {
        CareerSubCategoryDTO dto = new CareerSubCategoryDTO();
        dto.setId(subCategory.getId());
        dto.setSubCategoryId(subCategory.getSubCategoryId());
        dto.setTitle(subCategory.getTitle());
        dto.setSkills(subCategory.getSkills());
        dto.setDescription(subCategory.getDescription());
        dto.setIcon(subCategory.getIcon());
        dto.setCreatedAt(subCategory.getCreatedAt());
        return dto;
    }
}
