package com.example.wayme_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "career_directions")
public class CareerDirection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String directionId; // "it", "data", "marketing", etc.

    @Column(nullable = false)
    private String title; // İnformasiya Texnologiyaları

    @Column(length = 500)
    private String description; // IT və Proqramlaşdırma

    @Column(nullable = false)
    private String icon; // Code2, Database, etc.

    @Column(nullable = false)
    private String color; // text-blue-400

    @Column(nullable = false)
    private String bg; // bg-blue-400/10

    @Column(nullable = false)
    private String border; // border-blue-400/20

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    // Constructors
    public CareerDirection() {}

    public CareerDirection(String directionId, String title, String description, 
                          String icon, String color, String bg, String border) {
        this.directionId = directionId;
        this.title = title;
        this.description = description;
        this.icon = icon;
        this.color = color;
        this.bg = bg;
        this.border = border;
        this.createdAt = LocalDateTime.now();
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
}
