package com.example.wayme_backend.repository;

import com.example.wayme_backend.entity.PdfRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PdfRequestRepository extends JpaRepository<PdfRequest, Long> {
    Optional<PdfRequest> findByPersonalInfoId(Long personalInfoId);
    List<PdfRequest> findAllByPersonalInfoId(Long personalInfoId);
    List<PdfRequest> findByStatus(String status);
}
