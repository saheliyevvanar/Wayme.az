package com.example.wayme_backend.controller;

import com.example.wayme_backend.dto.CareerDirectionDTO;
import com.example.wayme_backend.dto.SaveCareerDirectionRequest;
import com.example.wayme_backend.entity.UserCareerDirection;
import com.example.wayme_backend.service.CareerDirectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/career-directions")
@CrossOrigin(origins = "*", maxAge = 3600)
public class CareerDirectionController {

    @Autowired
    private CareerDirectionService careerDirectionService;

    /**
     * Get all career directions (main categories)
     * GET /api/career-directions
     */
    @GetMapping
    public ResponseEntity<List<CareerDirectionDTO>> getAllCareerDirections() {
        List<CareerDirectionDTO> directions = careerDirectionService.getAllCareerDirections();
        return ResponseEntity.ok(directions);
    }

    /**
     * Get a specific career direction with its sub-categories
     * GET /api/career-directions/{directionId}
     */
    @GetMapping("/{directionId}")
    public ResponseEntity<CareerDirectionDTO> getCareerDirectionWithSubCategories(
            @PathVariable String directionId) {
        CareerDirectionDTO direction = careerDirectionService.getCareerDirectionWithSubCategories(directionId);
        return ResponseEntity.ok(direction);
    }

    /**
     * Save user's career direction choice
     * POST /api/career-directions/save
     */
    @PostMapping("/save")
    public ResponseEntity<UserCareerDirection> saveUserCareerDirection(
            @RequestBody SaveCareerDirectionRequest request) {
        try {
            UserCareerDirection savedDirection = careerDirectionService.saveUserCareerDirection(
                    request.getPersonalInfoId(),
                    request.getDirectionId(),
                    request.getSubCategoryId()
            );
            return ResponseEntity.ok(savedDirection);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Get user's selected career direction
     * GET /api/career-directions/user/{personalInfoId}
     */
    @GetMapping("/user/{personalInfoId}")
    public ResponseEntity<UserCareerDirection> getUserCareerDirection(
            @PathVariable Long personalInfoId) {
        UserCareerDirection userDirection = careerDirectionService.getUserCareerDirection(personalInfoId);
        if (userDirection != null) {
            return ResponseEntity.ok(userDirection);
        }
        return ResponseEntity.notFound().build();
    }
}
