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

    @GetMapping
    public ResponseEntity<List<AboutUsDTO>> getAllAboutUs() {
        List<AboutUsDTO> aboutUs = aboutUsService.getAllAboutUs();
        return ResponseEntity.ok(aboutUs);
    }

    @GetMapping("/section/{sectionType}")
    public ResponseEntity<List<AboutUsDTO>> getAboutUsBySection(@PathVariable String sectionType) {
        List<AboutUsDTO> aboutUs = aboutUsService.getAboutUsBySection(sectionType);
        return ResponseEntity.ok(aboutUs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AboutUsDTO> getAboutUsById(@PathVariable Long id) {
        AboutUsDTO aboutUs = aboutUsService.getAboutUsById(id);
        if (aboutUs != null) {
            return ResponseEntity.ok(aboutUs);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<AboutUsDTO> createAboutUs(@RequestBody AboutUsDTO dto) {
        AboutUsDTO created = aboutUsService.createAboutUs(dto);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AboutUsDTO> updateAboutUs(@PathVariable Long id, @RequestBody AboutUsDTO dto) {
        AboutUsDTO updated = aboutUsService.updateAboutUs(id, dto);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteAboutUs(@PathVariable Long id) {
        if (aboutUsService.deleteAboutUs(id)) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Məlumat uğurla silindi");
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.notFound().build();
    }
}
