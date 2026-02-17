package com.example.wayme_backend.controller;

import com.example.wayme_backend.dto.CareerDirectionDTO;
import com.example.wayme_backend.dto.SaveCareerDirectionRequest;
import com.example.wayme_backend.dto.SaveUserCareerChoiceRequest;
import com.example.wayme_backend.entity.UserCareerChoice;
import com.example.wayme_backend.entity.UserCareerDirection;
import com.example.wayme_backend.repository.UserCareerChoiceRepository;
import com.example.wayme_backend.service.CareerDirectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/career-directions")
@CrossOrigin(origins = "*", maxAge = 3600)
public class CareerDirectionController {

    @Autowired
    private CareerDirectionService careerDirectionService;

    @Autowired
    private UserCareerChoiceRepository userCareerChoiceRepository;

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
    public ResponseEntity<?> saveUserCareerDirection(
            @RequestBody SaveCareerDirectionRequest request) {
        try {
            UserCareerDirection savedDirection = careerDirectionService.saveUserCareerDirection(
                    request.getPersonalInfoId(),
                    request.getDirectionId(),
                    request.getSubCategoryId()
            );
            return ResponseEntity.ok(savedDirection);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new java.util.HashMap<String, String>() {{
                put("error", e.getMessage());
            }});
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(new java.util.HashMap<String, String>() {{
                put("error", "Server error: " + e.getMessage());
            }});
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

    /**
     * Save user's career choice (simple - no foreign key dependency)
     * POST /api/career-directions/save-choice
     */
    @PostMapping("/save-choice")
    public ResponseEntity<?> saveUserCareerChoice(@RequestBody SaveUserCareerChoiceRequest request) {
        try {
            System.out.println("Saving career choice: " + request);

            // Find existing or create new
            UserCareerChoice choice = userCareerChoiceRepository
                    .findByPersonalInfoId(request.getPersonalInfoId())
                    .orElse(new UserCareerChoice());

            choice.setPersonalInfoId(request.getPersonalInfoId());
            choice.setCategoryId(request.getCategoryId());
            choice.setCategoryTitle(request.getCategoryTitle());
            choice.setSubCategoryId(request.getSubCategoryId());
            choice.setSubCategoryTitle(request.getSubCategoryTitle());

            UserCareerChoice saved = userCareerChoiceRepository.save(choice);
            System.out.println("Career choice saved with ID: " + saved.getId());

            Map<String, Object> response = new HashMap<>();
            response.put("id", saved.getId());
            response.put("personalInfoId", saved.getPersonalInfoId());
            response.put("categoryId", saved.getCategoryId());
            response.put("categoryTitle", saved.getCategoryTitle());
            response.put("subCategoryId", saved.getSubCategoryId());
            response.put("subCategoryTitle", saved.getSubCategoryTitle());
            response.put("message", "İş istiqaməti uğurla saxlanıldı");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Get user's career choice
     * GET /api/career-directions/choice/{personalInfoId}
     */
    @GetMapping("/choice/{personalInfoId}")
    public ResponseEntity<?> getUserCareerChoice(@PathVariable Long personalInfoId) {
        return userCareerChoiceRepository.findByPersonalInfoId(personalInfoId)
                .map(choice -> ResponseEntity.ok((Object) choice))
                .orElse(ResponseEntity.notFound().build());
    }
}
