package com.example.wayme_backend.controller;

import com.example.wayme_backend.dto.PdfRequestDTO;
import com.example.wayme_backend.dto.RequestPdfRequest;
import com.example.wayme_backend.service.PdfRequestService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pdf-requests")
@CrossOrigin(origins = "*")
public class PdfRequestController {

    @Autowired
    private PdfRequestService pdfRequestService;

    /**
     * Request PDF report
     * POST /api/pdf-requests/request
     */
    @PostMapping("/request")
    public ResponseEntity<?> requestPdf(@Valid @RequestBody RequestPdfRequest request) {
        try {
            PdfRequestDTO result = pdfRequestService.requestPdf(request);
            Map<String, Object> response = new HashMap<>();
            response.put("id", result.getId());
            response.put("personalInfoId", result.getPersonalInfoId());
            response.put("email", result.getEmail());
            response.put("status", result.getStatus());
            response.put("message", "PDF sorğunuz qəbul edildi! Email ünvanınıza qısa zamanda göndəriləcəkdir");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Get PDF request by personal info ID
     * GET /api/pdf-requests/{personalInfoId}
     */
    @GetMapping("/{personalInfoId}")
    public ResponseEntity<?> getPdfRequest(@PathVariable Long personalInfoId) {
        try {
            PdfRequestDTO result = pdfRequestService.getPdfRequest(personalInfoId);
            if (result != null) {
                return ResponseEntity.ok(result);
            } else {
                Map<String, String> error = new HashMap<>();
                error.put("message", "PDF sorğusu tapılmadı");
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Get all PDF requests for a user
     * GET /api/pdf-requests/history/{personalInfoId}
     */
    @GetMapping("/history/{personalInfoId}")
    public ResponseEntity<?> getAllPdfRequests(@PathVariable Long personalInfoId) {
        try {
            List<PdfRequestDTO> results = pdfRequestService.getAllPdfRequests(personalInfoId);
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Get pending PDF requests (for admin/background processing)
     * GET /api/pdf-requests/admin/pending
     */
    @GetMapping("/admin/pending")
    public ResponseEntity<?> getPendingRequests() {
        try {
            List<PdfRequestDTO> results = pdfRequestService.getPendingRequests();
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
