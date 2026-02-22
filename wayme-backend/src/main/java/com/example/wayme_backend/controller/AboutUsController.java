package com.example.wayme_backend.controller;

import com.example.wayme_backend.dto.AboutUsDTO;
import com.example.wayme_backend.service.AboutUsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/about-us")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AboutUsController {

    @Autowired
    private AboutUsService aboutUsService;

    /**
     * Get all About Us content
     * GET /api/about-us
     */
    @GetMapping
    public ResponseEntity<List<AboutUsDTO>> getAllAboutUs() {
        List<AboutUsDTO> aboutUs = aboutUsService.getAllAboutUs();
        return ResponseEntity.ok(aboutUs);
    }

    /**
     * Get About Us content by section type
     * GET /api/about-us/section/{sectionType}
     * Examples: mission, vision, values, services, contact
     */
    @GetMapping("/section/{sectionType}")
    public ResponseEntity<List<AboutUsDTO>> getAboutUsBySection(@PathVariable String sectionType) {
        List<AboutUsDTO> aboutUs = aboutUsService.getAboutUsBySection(sectionType);
        return ResponseEntity.ok(aboutUs);
    }

    /**
     * Get specific About Us item by ID
     * GET /api/about-us/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<AboutUsDTO> getAboutUsById(@PathVariable Long id) {
        AboutUsDTO aboutUs = aboutUsService.getAboutUsById(id);
        if (aboutUs != null) {
            return ResponseEntity.ok(aboutUs);
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Create new About Us content
     * POST /api/about-us
     */
    @PostMapping
    public ResponseEntity<AboutUsDTO> createAboutUs(@RequestBody AboutUsDTO dto) {
        AboutUsDTO created = aboutUsService.createAboutUs(dto);
        return ResponseEntity.ok(created);
    }

    /**
     * Update existing About Us content
     * PUT /api/about-us/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<AboutUsDTO> updateAboutUs(
            @PathVariable Long id,
            @RequestBody AboutUsDTO dto) {
        AboutUsDTO updated = aboutUsService.updateAboutUs(id, dto);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Delete About Us content
     * DELETE /api/about-us/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteAboutUs(@PathVariable Long id) {
        if (aboutUsService.deleteAboutUs(id)) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "About Us content deleted successfully");
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.notFound().build();
    }
}
