package com.example.wayme_backend.service;

import com.example.wayme_backend.dto.CreatePersonalSkillsRequest;
import com.example.wayme_backend.dto.PersonalSkillsDTO;
import com.example.wayme_backend.entity.PersonalSkills;
import com.example.wayme_backend.repository.PersonalSkillsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PersonalSkillsService {

    @Autowired
    private PersonalSkillsRepository personalSkillsRepository;

    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm");

    public PersonalSkillsDTO createPersonalSkills(CreatePersonalSkillsRequest request) {
        // Validate minimum skills
        if (request.getSkills() == null || request.getSkills().size() < 3) {
            throw new IllegalArgumentException("Minimum 3 bacarıq seçilməlidir");
        }

        // Trim and filter empty skills (allow duplicates)
        List<String> cleanedSkills = request.getSkills().stream()
                .filter(s -> s != null && !s.trim().isEmpty())
                .map(String::trim)
                .collect(Collectors.toList());

        if (cleanedSkills.size() < 3) {
            throw new IllegalArgumentException("Minimum 3 bacarıq seçilməlidir");
        }

        PersonalSkills personalSkills = new PersonalSkills();
        personalSkills.setSkills(cleanedSkills);

        PersonalSkills saved = personalSkillsRepository.save(personalSkills);
        return convertToDTO(saved);
    }

    public PersonalSkillsDTO getPersonalSkillsById(Long id) {
        PersonalSkills personalSkills = personalSkillsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bacarıqlar tapılmadı: " + id));
        return convertToDTO(personalSkills);
    }

    public PersonalSkillsDTO getPersonalSkillsBySessionId(String sessionId) {
        PersonalSkills personalSkills = personalSkillsRepository.findBySessionId(sessionId)
                .orElseThrow(() -> new RuntimeException("Session tapılmadı: " + sessionId));
        return convertToDTO(personalSkills);
    }

    public PersonalSkillsDTO updatePersonalSkills(Long id, CreatePersonalSkillsRequest request) {
        PersonalSkills personalSkills = personalSkillsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bacarıqlar tapılmadı: " + id));

        // Validate minimum skills
        if (request.getSkills() == null || request.getSkills().size() < 3) {
            throw new IllegalArgumentException("Minimum 3 bacarıq seçilməlidir");
        }

        // Trim and filter empty skills (allow duplicates)
        List<String> cleanedSkills = request.getSkills().stream()
                .filter(s -> s != null && !s.trim().isEmpty())
                .map(String::trim)
                .collect(Collectors.toList());

        if (cleanedSkills.size() < 3) {
            throw new IllegalArgumentException("Minimum 3 bacarıq seçilməlidir");
        }

        // Mövcud bacarıqlara yeni bacarıqları əlavə et (dublikat da ola bilər)
        List<String> existingSkills = new ArrayList<>(personalSkills.getSkills());
        existingSkills.addAll(cleanedSkills);

        personalSkills.setSkills(existingSkills);

        PersonalSkills saved = personalSkillsRepository.save(personalSkills);
        return convertToDTO(saved);
    }

    public void deletePersonalSkills(Long id) {
        if (!personalSkillsRepository.existsById(id)) {
            throw new RuntimeException("Bacarıqlar tapılmadı: " + id);
        }
        personalSkillsRepository.deleteById(id);
    }

    public List<PersonalSkillsDTO> getAllPersonalSkills() {
        return personalSkillsRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<String> getAllUniqueSkills() {
        return personalSkillsRepository.findAllUniqueSkills();
    }

    public List<PersonalSkillsDTO> searchBySkill(String skill) {
        return personalSkillsRepository.findBySkillContaining(skill).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private PersonalSkillsDTO convertToDTO(PersonalSkills personalSkills) {
        PersonalSkillsDTO dto = new PersonalSkillsDTO();
        dto.setId(personalSkills.getId());
        dto.setSessionId(personalSkills.getSessionId());
        dto.setSkills(new ArrayList<>(personalSkills.getSkills()));
        dto.setCreatedAt(personalSkills.getCreatedAt() != null 
                ? personalSkills.getCreatedAt().format(DATE_TIME_FORMATTER) : null);
        dto.setUpdatedAt(personalSkills.getUpdatedAt() != null 
                ? personalSkills.getUpdatedAt().format(DATE_TIME_FORMATTER) : null);
        return dto;
    }
}
