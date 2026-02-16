package com.example.wayme_backend.dto;

public class SaveCareerDirectionRequest {
    private Long personalInfoId;
    private String directionId;
    private String subCategoryId;

    // Constructors
    public SaveCareerDirectionRequest() {}

    public SaveCareerDirectionRequest(Long personalInfoId, String directionId, String subCategoryId) {
        this.personalInfoId = personalInfoId;
        this.directionId = directionId;
        this.subCategoryId = subCategoryId;
    }

    // Getters and Setters
    public Long getPersonalInfoId() {
        return personalInfoId;
    }

    public void setPersonalInfoId(Long personalInfoId) {
        this.personalInfoId = personalInfoId;
    }

    public String getDirectionId() {
        return directionId;
    }

    public void setDirectionId(String directionId) {
        this.directionId = directionId;
    }

    public String getSubCategoryId() {
        return subCategoryId;
    }

    public void setSubCategoryId(String subCategoryId) {
        this.subCategoryId = subCategoryId;
    }
}
