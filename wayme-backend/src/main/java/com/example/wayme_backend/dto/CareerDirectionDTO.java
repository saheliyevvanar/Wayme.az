package com.example.wayme_backend.dto;

import java.time.LocalDateTime;
import java.util.List;

public class CareerDirectionDTO {
    private Long id;
    private String directionId;
    private String title;
    private String description;
    private String icon;
    private String color;
    private String bg;
    private String border;
    private LocalDateTime createdAt;
    private List<CareerSubCategoryDTO> subCategories;

    // Constructors
    public CareerDirectionDTO() {}

    public CareerDirectionDTO(Long id, String directionId, String title, String description,
                             String icon, String color, String bg, String border) {
        this.id = id;
        this.directionId = directionId;
        this.title = title;
        this.description = description;
        this.icon = icon;
        this.color = color;
        this.bg = bg;
        this.border = border;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDirectionId() {
        return directionId;
    }

    public void setDirectionId(String directionId) {
        this.directionId = directionId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getBg() {
        return bg;
    }

    public void setBg(String bg) {
        this.bg = bg;
    }

    public String getBorder() {
        return border;
    }

    public void setBorder(String border) {
        this.border = border;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<CareerSubCategoryDTO> getSubCategories() {
        return subCategories;
    }

    public void setSubCategories(List<CareerSubCategoryDTO> subCategories) {
        this.subCategories = subCategories;
    }
}
