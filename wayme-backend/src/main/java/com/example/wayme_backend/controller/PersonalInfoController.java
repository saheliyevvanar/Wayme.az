package com.example.wayme_backend.controller;

import com.example.wayme_backend.dto.CreatePersonalInfoRequest;
import com.example.wayme_backend.dto.PersonalInfoDTO;
import com.example.wayme_backend.dto.PersonalInfoHistoryDTO;
import com.example.wayme_backend.service.PersonalInfoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/personal-info")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Frontend üçün CORS
public class PersonalInfoController {

    private final PersonalInfoService personalInfoService;

    /**
     * Yeni şəxsi məlumat yaratmaq
     * POST /api/personal-info
     */
    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody CreatePersonalInfoRequest request) {
        try {
            PersonalInfoDTO created = personalInfoService.create(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(errorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorResponse("Xəta baş verdi: " + e.getMessage()));
        }
    }

    /**
     * ID ilə şəxsi məlumatı almaq
     * GET /api/personal-info/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        try {
            PersonalInfoDTO personalInfo = personalInfoService.getById(id);
            return ResponseEntity.ok(personalInfo);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse(e.getMessage()));
        }
    }

    /**
     * Bütün şəxsi məlumatları almaq
     * GET /api/personal-info
     */
    @GetMapping
    public ResponseEntity<List<PersonalInfoDTO>> getAll() {
        List<PersonalInfoDTO> list = personalInfoService.getAll();
        return ResponseEntity.ok(list);
    }

    /**
     * Şəxsi məlumatı yeniləmək
     * PUT /api/personal-info/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody CreatePersonalInfoRequest request) {
        try {
            PersonalInfoDTO updated = personalInfoService.update(id, request);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(errorResponse(e.getMessage()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse(e.getMessage()));
        }
    }

    /**
     * Şəxsi məlumatı silmək
     * DELETE /api/personal-info/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            personalInfoService.delete(id);
            return ResponseEntity.ok(successResponse("Şəxsi məlumat uğurla silindi"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse(e.getMessage()));
        }
    }

    /**
     * Ada görə axtarış
     * GET /api/personal-info/search/name?q=...
     */
    @GetMapping("/search/name")
    public ResponseEntity<List<PersonalInfoDTO>> searchByName(@RequestParam("q") String name) {
        List<PersonalInfoDTO> results = personalInfoService.searchByName(name);
        return ResponseEntity.ok(results);
    }

    /**
     * Soyadına görə axtarış
     * GET /api/personal-info/search/surname?q=...
     */
    @GetMapping("/search/surname")
    public ResponseEntity<List<PersonalInfoDTO>> searchBySurname(@RequestParam("q") String surname) {
        List<PersonalInfoDTO> results = personalInfoService.searchBySurname(surname);
        return ResponseEntity.ok(results);
    }

    /**
     * Session ID ilə tarixə baxmaq
     * GET /api/personal-info/history/{sessionId}
     */
    @GetMapping("/history/{sessionId}")
    public ResponseEntity<List<PersonalInfoHistoryDTO>> getHistory(@PathVariable String sessionId) {
        List<PersonalInfoHistoryDTO> history = personalInfoService.getHistoryBySessionId(sessionId);
        return ResponseEntity.ok(history);
    }

    private Map<String, String> errorResponse(String message) {
        Map<String, String> response = new HashMap<>();
        response.put("error", message);
        return response;
    }

    private Map<String, String> successResponse(String message) {
        Map<String, String> response = new HashMap<>();
        response.put("message", message);
        return response;
    }
}
