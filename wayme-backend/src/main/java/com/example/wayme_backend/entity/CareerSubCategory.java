package com.example.wayme_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "career_subcategories")
public class CareerSubCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "direction_id", nullable = false)
    private CareerDirection careerDirection;

    @Column(nullable = false)
    private String subCategoryId; // "frontend", "backend", etc.

    @Column(nullable = false)
    private String title; // Frontend proqramçı

    @Column(nullable = false)
    private String skills; // HTML, CSS, JavaScript, React

    @Column(nullable = false, length = 500)
    private String description; // İstifadəçinin gördüyü sayt...

    @Column(nullable = false)
    private String icon; // Code2

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    // Constructors
    public CareerSubCategory() {}

    public CareerSubCategory(CareerDirection careerDirection, String subCategoryId, 
                           String title, String skills, String description, String icon) {
        this.careerDirection = careerDirection;
        this.subCategoryId = subCategoryId;
        this.title = title;
        this.skills = skills;
        this.description = description;
        this.icon = icon;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CareerDirection getCareerDirection() {
        return careerDirection;
    }

    public void setCareerDirection(CareerDirection careerDirection) {
        this.careerDirection = careerDirection;
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
