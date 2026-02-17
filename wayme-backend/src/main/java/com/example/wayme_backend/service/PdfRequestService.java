package com.example.wayme_backend.service;

import com.example.wayme_backend.dto.PdfRequestDTO;
import com.example.wayme_backend.dto.RequestPdfRequest;
import com.example.wayme_backend.entity.PdfRequest;
import com.example.wayme_backend.repository.PdfRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PdfRequestService {

    @Autowired
    private PdfRequestRepository pdfRequestRepository;

    /**
     * Request PDF report
     */
    public PdfRequestDTO requestPdf(RequestPdfRequest request) {
        try {
            System.out.println("PDF requested for personalInfoId: " + request.getPersonalInfoId() + ", email: " + request.getEmail());

            // Find existing PDF request or create new
            PdfRequest pdfRequest = pdfRequestRepository
                    .findByPersonalInfoId(request.getPersonalInfoId())
                    .orElse(new PdfRequest());

            pdfRequest.setPersonalInfoId(request.getPersonalInfoId());
            pdfRequest.setEmail(request.getEmail());
            pdfRequest.setStatus("pending");

            PdfRequest saved = pdfRequestRepository.save(pdfRequest);
            System.out.println("PDF request saved with ID: " + saved.getId());

            return convertToDTO(saved);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error requesting PDF: " + e.getMessage());
        }
    }

    /**
     * Get PDF request by personal info ID
     */
    public PdfRequestDTO getPdfRequest(Long personalInfoId) {
        return pdfRequestRepository.findByPersonalInfoId(personalInfoId)
                .map(this::convertToDTO)
                .orElse(null);
    }

    /**
     * Get all PDF requests for a user
     */
    public List<PdfRequestDTO> getAllPdfRequests(Long personalInfoId) {
        return pdfRequestRepository.findAllByPersonalInfoId(personalInfoId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get pending PDF requests (for admin/processing)
     */
    public List<PdfRequestDTO> getPendingRequests() {
        return pdfRequestRepository.findByStatus("pending")
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Convert PdfRequest entity to DTO
     */
    private PdfRequestDTO convertToDTO(PdfRequest pdfRequest) {
        PdfRequestDTO dto = new PdfRequestDTO();
        dto.setId(pdfRequest.getId());
        dto.setPersonalInfoId(pdfRequest.getPersonalInfoId());
        dto.setEmail(pdfRequest.getEmail());
        dto.setStatus(pdfRequest.getStatus());
        dto.setSentAt(pdfRequest.getSentAt());
        dto.setErrorMessage(pdfRequest.getErrorMessage());
        dto.setCreatedAt(pdfRequest.getCreatedAt());
        dto.setUpdatedAt(pdfRequest.getUpdatedAt());
        return dto;
    }
}
