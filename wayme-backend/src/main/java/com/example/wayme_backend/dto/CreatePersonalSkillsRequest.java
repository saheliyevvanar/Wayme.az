package com.example.wayme_backend.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreatePersonalSkillsRequest {

    @NotEmpty(message = "Ən azı bir bacarıq seçilməlidir")
    @Size(min = 3, message = "Minimum 3 bacarıq seçilməlidir")
    private List<String> skills;
}
