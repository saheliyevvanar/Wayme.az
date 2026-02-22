package com.example.wayme_backend.service;

import com.example.wayme_backend.dto.AboutUsDTO;
import com.example.wayme_backend.entity.AboutUs;
import com.example.wayme_backend.repository.AboutUsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AboutUsService {

    @Autowired
    private AboutUsRepository aboutUsRepository;

    public List<AboutUsDTO> getAllAboutUs() {
        return aboutUsRepository.findAllByOrderByDisplayOrder()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<AboutUsDTO> getAboutUsBySection(String sectionType) {
        return aboutUsRepository.findBySectionTypeOrderByDisplayOrder(sectionType)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public AboutUsDTO getAboutUsById(Long id) {
        return aboutUsRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    public AboutUsDTO createAboutUs(AboutUsDTO dto) {
        AboutUs aboutUs = new AboutUs(
                dto.getSectionType(),
                dto.getTitle(),
                dto.getDescription(),
                dto.getIconName(),
                dto.getDisplayOrder()
        );
        AboutUs saved = aboutUsRepository.save(aboutUs);
        return convertToDTO(saved);
    }

    public AboutUsDTO updateAboutUs(Long id, AboutUsDTO dto) {
        return aboutUsRepository.findById(id)
                .map(aboutUs -> {
                    aboutUs.setSectionType(dto.getSectionType());
                    aboutUs.setTitle(dto.getTitle());
                    aboutUs.setDescription(dto.getDescription());
                    aboutUs.setIconName(dto.getIconName());
                    aboutUs.setDisplayOrder(dto.getDisplayOrder());
                    aboutUs.setUpdatedAt(LocalDateTime.now());
                    AboutUs updated = aboutUsRepository.save(aboutUs);
                    return convertToDTO(updated);
                })
                .orElse(null);
    }

    public boolean deleteAboutUs(Long id) {
        if (aboutUsRepository.existsById(id)) {
            aboutUsRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private AboutUsDTO convertToDTO(AboutUs aboutUs) {
        AboutUsDTO dto = new AboutUsDTO();
        dto.setId(aboutUs.getId());
        dto.setSectionType(aboutUs.getSectionType());
        dto.setTitle(aboutUs.getTitle());
        dto.setDescription(aboutUs.getDescription());
        dto.setIconName(aboutUs.getIconName());
        dto.setDisplayOrder(aboutUs.getDisplayOrder());
        return dto;
    }
}
