package com.example.wayme_backend.service;

import com.example.wayme_backend.dto.CreatePersonalInfoRequest;
import com.example.wayme_backend.dto.PersonalInfoDTO;
import com.example.wayme_backend.dto.PersonalInfoHistoryDTO;
import com.example.wayme_backend.entity.PersonalInfo;
import com.example.wayme_backend.entity.PersonalInfoHistory;
import com.example.wayme_backend.repository.PersonalInfoRepository;
import com.example.wayme_backend.repository.PersonalInfoHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PersonalInfoService {

    private final PersonalInfoRepository personalInfoRepository;
    private final PersonalInfoHistoryRepository personalInfoHistoryRepository;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd.MM.yyyy");

    /**
     * Yeni şəxsi məlumat yaratmaq
     */
    @Transactional
    public PersonalInfoDTO create(CreatePersonalInfoRequest request) {
        validateRequest(request);

        PersonalInfo personalInfo = new PersonalInfo();
        personalInfo.setName(capitalizeFirstLetter(request.getName().trim()));
        personalInfo.setSurname(capitalizeFirstLetter(request.getSurname().trim()));
        personalInfo.setBirthDate(parseBirthDate(request.getBirthDate()));

        PersonalInfo saved = personalInfoRepository.save(personalInfo);
        return mapToDTO(saved);
    }

    /**
     * ID ilə şəxsi məlumatı almaq
     */
    public PersonalInfoDTO getById(Long id) {
        PersonalInfo personalInfo = personalInfoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Şəxsi məlumat tapılmadı: " + id));
        return mapToDTO(personalInfo);
    }

    /**
     * Bütün şəxsi məlumatları almaq
     */
    public List<PersonalInfoDTO> getAll() {
        return personalInfoRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Şəxsi məlumatı yeniləmək və history-ə əlavə etmək
     */
    @Transactional
    public PersonalInfoDTO update(Long id, CreatePersonalInfoRequest request) {
        validateRequest(request);

        PersonalInfo personalInfo = personalInfoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Şəxsi məlumat tapılmadı: " + id));

        // Eski məlumatları history-yə saxla
        PersonalInfoHistory history = new PersonalInfoHistory();
        history.setSessionId(personalInfo.getSessionId());
        history.setName(personalInfo.getName());
        history.setSurname(personalInfo.getSurname());
        history.setBirthDate(personalInfo.getBirthDate());
        personalInfoHistoryRepository.save(history);

        // Yeni məlumatları əsas cədvələ əlavə et
        personalInfo.setName(capitalizeFirstLetter(request.getName().trim()));
        personalInfo.setSurname(capitalizeFirstLetter(request.getSurname().trim()));
        personalInfo.setBirthDate(parseBirthDate(request.getBirthDate()));

        PersonalInfo saved = personalInfoRepository.save(personalInfo);
        return mapToDTO(saved);
    }

    /**
     * Session ID ilə bütün tarixin götürmek
     */
    public List<PersonalInfoHistoryDTO> getHistoryBySessionId(String sessionId) {
        return personalInfoHistoryRepository.findBySessionIdOrderByCreatedAtDesc(sessionId)
                .stream()
                .map(this::mapHistoryToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Şəxsi məlumatı silmək
     */
    @Transactional
    public void delete(Long id) {
        if (!personalInfoRepository.existsById(id)) {
            throw new RuntimeException("Şəxsi məlumat tapılmadı: " + id);
        }
        personalInfoRepository.deleteById(id);
    }

    /**
     * Ada görə axtarış
     */
    public List<PersonalInfoDTO> searchByName(String name) {
        return personalInfoRepository.findByNameContainingIgnoreCase(name)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Soyadına görə axtarış
     */
    public List<PersonalInfoDTO> searchBySurname(String surname) {
        return personalInfoRepository.findBySurnameContainingIgnoreCase(surname)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Validasiya
     */
    private void validateRequest(CreatePersonalInfoRequest request) {
        if (request.getName() == null || request.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Ad boş qala bilməz");
        }
        if (request.getName().trim().length() > 30) {
            throw new IllegalArgumentException("Ad maksimum 30 simvol ola bilər");
        }
        if (request.getName().matches(".*\\d.*")) {
            throw new IllegalArgumentException("Ad rəqəm daxil edə bilməz");
        }

        if (request.getSurname() == null || request.getSurname().trim().isEmpty()) {
            throw new IllegalArgumentException("Soyad boş qala bilməz");
        }
        if (request.getSurname().trim().length() > 30) {
            throw new IllegalArgumentException("Soyad maksimum 30 simvol ola bilər");
        }
        if (request.getSurname().matches(".*\\d.*")) {
            throw new IllegalArgumentException("Soyad rəqəm daxil edə bilməz");
        }

        if (request.getBirthDate() == null || request.getBirthDate().trim().isEmpty()) {
            throw new IllegalArgumentException("Doğum tarixi boş qala bilməz");
        }

        // Doğum tarixini yoxla
        LocalDate birthDate = parseBirthDate(request.getBirthDate());
        LocalDate today = LocalDate.now();

        if (birthDate.isAfter(today)) {
            throw new IllegalArgumentException("Gələcək tarix seçilə bilməz");
        }

        int age = today.getYear() - birthDate.getYear();
        if (today.getMonthValue() < birthDate.getMonthValue() ||
                (today.getMonthValue() == birthDate.getMonthValue() && today.getDayOfMonth() < birthDate.getDayOfMonth())) {
            age--;
        }

        if (age < 14) {
            throw new IllegalArgumentException("Minimum yaş 14 olmalıdır");
        }
        if (age > 80) {
            throw new IllegalArgumentException("Maksimum yaş 80 olmalıdır");
        }
    }

    /**
     * String tarixini LocalDate-ə çevirmək
     */
    private LocalDate parseBirthDate(String birthDate) {
        try {
            return LocalDate.parse(birthDate.trim(), DATE_FORMATTER);
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("Tarixi gün.ay.il formatında yazın (məs: 05.09.2004)");
        }
    }

    /**
     * İlk hərfi böyük etmək
     */
    private String capitalizeFirstLetter(String str) {
        if (str == null || str.isEmpty()) {
            return str;
        }
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }

    /**
     * Entity-ni DTO-ya çevirmək
     */
    private PersonalInfoDTO mapToDTO(PersonalInfo entity) {
        PersonalInfoDTO dto = new PersonalInfoDTO();
        dto.setId(entity.getId());
        dto.setSessionId(entity.getSessionId());
        dto.setName(entity.getName());
        dto.setSurname(entity.getSurname());
        dto.setBirthDate(entity.getBirthDate());
        dto.setBirthDateFormatted(entity.getBirthDate().format(DATE_FORMATTER));
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        return dto;
    }

    /**
     * History Entity-ni DTO-ya çevirmək
     */
    private PersonalInfoHistoryDTO mapHistoryToDTO(PersonalInfoHistory entity) {
        PersonalInfoHistoryDTO dto = new PersonalInfoHistoryDTO();
        dto.setId(entity.getId());
        dto.setSessionId(entity.getSessionId());
        dto.setName(entity.getName());
        dto.setSurname(entity.getSurname());
        dto.setBirthDate(entity.getBirthDate().format(DATE_FORMATTER));
        dto.setCreatedAt(entity.getCreatedAt() != null 
                ? entity.getCreatedAt().format(DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm")) : null);
        return dto;
    }
}
