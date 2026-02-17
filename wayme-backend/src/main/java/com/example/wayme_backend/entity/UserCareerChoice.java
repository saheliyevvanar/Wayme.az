package com.example.wayme_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_career_choices")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserCareerChoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "personal_info_id", nullable = false)
    private Long personalInfoId;

    @Column(name = "category_id", nullable = false)
    private String categoryId;

    @Column(name = "category_title", nullable = false)
    private String categoryTitle;

    @Column(name = "sub_category_id")
    private String subCategoryId;

    @Column(name = "sub_category_title")
    private String subCategoryTitle;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
