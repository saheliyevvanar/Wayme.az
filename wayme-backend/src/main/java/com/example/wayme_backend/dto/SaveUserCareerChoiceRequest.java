package com.example.wayme_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SaveUserCareerChoiceRequest {
    private Long personalInfoId;
    private String categoryId;      // "it", "logistics", etc.
    private String categoryTitle;   // "İnformasiya Texnologiyaları"
    private String subCategoryId;   // "frontend", "backend", etc. - nullable
    private String subCategoryTitle; // "Frontend proqramçı" - nullable
}
