package com.example.wayme_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_career_directions")
public class UserCareerDirection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "personal_info_id", nullable = false)
    private PersonalInfo personalInfo;

    @ManyToOne
    @JoinColumn(name = "career_direction_id", nullable = false)
    private CareerDirection careerDirection;

    @ManyToOne
    @JoinColumn(name = "sub_category_id")
    private CareerSubCategory careerSubCategory;

    @Column(name = "selected_at")
    private LocalDateTime selectedAt = LocalDateTime.now();

    // Constructors
    public UserCareerDirection() {}

    public UserCareerDirection(PersonalInfo personalInfo, CareerDirection careerDirection, 
                             CareerSubCategory careerSubCategory) {
        this.personalInfo = personalInfo;
        this.careerDirection = careerDirection;
        this.careerSubCategory = careerSubCategory;
        this.selectedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PersonalInfo getPersonalInfo() {
        return personalInfo;
    }

    public void setPersonalInfo(PersonalInfo personalInfo) {
        this.personalInfo = personalInfo;
    }

    public CareerDirection getCareerDirection() {
        return careerDirection;
    }

    public void setCareerDirection(CareerDirection careerDirection) {
        this.careerDirection = careerDirection;
    }

    public CareerSubCategory getCareerSubCategory() {
        return careerSubCategory;
    }

    public void setCareerSubCategory(CareerSubCategory careerSubCategory) {
        this.careerSubCategory = careerSubCategory;
    }

    public LocalDateTime getSelectedAt() {
        return selectedAt;
    }

    public void setSelectedAt(LocalDateTime selectedAt) {
        this.selectedAt = selectedAt;
    }
}
