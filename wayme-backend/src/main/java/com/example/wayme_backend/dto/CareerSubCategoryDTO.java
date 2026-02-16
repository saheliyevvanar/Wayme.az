package com.example.wayme_backend.dto;

import java.time.LocalDateTime;

public class CareerSubCategoryDTO {
    private Long id;
    private String subCategoryId;
    private String title;
    private String skills;
    private String description;
    private String icon;
    private LocalDateTime createdAt;

    // Constructors
    public CareerSubCategoryDTO() {}

    public CareerSubCategoryDTO(Long id, String subCategoryId, String title,
                               String skills, String description, String icon) {
        this.id = id;
        this.subCategoryId = subCategoryId;
        this.title = title;
        this.skills = skills;
        this.description = description;
        this.icon = icon;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSubCategoryId() {
        return subCategoryId;
    }

    public void setSubCategoryId(String subCategoryId) {
        this.subCategoryId = subCategoryId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
