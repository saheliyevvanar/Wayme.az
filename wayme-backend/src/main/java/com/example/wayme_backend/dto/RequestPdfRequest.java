package com.example.wayme_backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestPdfRequest {

    @NotBlank(message = "Personal Info ID boş qala bilməz")
    private Long personalInfoId;

    @NotBlank(message = "Email boş qala bilməz")
    @Email(message = "Düzgün email formatı daxil edin")
    private String email;
}
