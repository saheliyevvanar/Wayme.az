package com.example.wayme_backend.controller;

import com.example.wayme_backend.dto.CreatePersonalSkillsRequest;
import com.example.wayme_backend.dto.PersonalSkillsDTO;
import com.example.wayme_backend.service.PersonalSkillsService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/personal-skills")
@CrossOrigin(origins = "*")
public class PersonalSkillsController {

    @Autowired
    private PersonalSkillsService personalSkillsService;

    @PostMapping
    public ResponseEntity<?> createPersonalSkills(@Valid @RequestBody CreatePersonalSkillsRequest request) {
        try {
            PersonalSkillsDTO created = personalSkillsService.createPersonalSkills(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPersonalSkillsById(@PathVariable Long id) {
        try {
            PersonalSkillsDTO dto = personalSkillsService.getPersonalSkillsById(id);
            return ResponseEntity.ok(dto);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }

    @GetMapping("/session/{sessionId}")
    public ResponseEntity<?> getPersonalSkillsBySessionId(@PathVariable String sessionId) {
        try {
            PersonalSkillsDTO dto = personalSkillsService.getPersonalSkillsBySessionId(sessionId);
            return ResponseEntity.ok(dto);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePersonalSkills(@PathVariable Long id, 
                                                   @Valid @RequestBody CreatePersonalSkillsRequest request) {
        try {
            PersonalSkillsDTO updated = personalSkillsService.updatePersonalSkills(id, request);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePersonalSkills(@PathVariable Long id) {
        try {
            personalSkillsService.deletePersonalSkills(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Bacarıqlar uğurla silindi");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }

    @GetMapping
    public ResponseEntity<List<PersonalSkillsDTO>> getAllPersonalSkills() {
        List<PersonalSkillsDTO> allSkills = personalSkillsService.getAllPersonalSkills();
        return ResponseEntity.ok(allSkills);
    }

    @GetMapping("/unique-skills")
    public ResponseEntity<List<String>> getAllUniqueSkills() {
        List<String> uniqueSkills = personalSkillsService.getAllUniqueSkills();
        return ResponseEntity.ok(uniqueSkills);
    }

    @GetMapping("/search")
    public ResponseEntity<List<PersonalSkillsDTO>> searchBySkill(@RequestParam String q) {
        List<PersonalSkillsDTO> results = personalSkillsService.searchBySkill(q);
        return ResponseEntity.ok(results);
    }
}
