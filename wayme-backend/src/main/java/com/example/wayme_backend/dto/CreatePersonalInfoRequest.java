package com.example.wayme_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreatePersonalInfoRequest {

    @NotBlank(message = "Ad boş qala bilməz")
    @Size(min = 2, max = 30, message = "Ad 2-30 simvol arası olmalıdır")
    @Pattern(regexp = "^[a-zA-ZəüöşığçƏÜÖŞİĞÇ\\s-]+$", message = "Ad yalnız hərflər və tire (-) daxil edə bilər")
    private String name;

    @NotBlank(message = "Soyad boş qala bilməz")
    @Size(min = 2, max = 30, message = "Soyad 2-30 simvol arası olmalıdır")
    @Pattern(regexp = "^[a-zA-ZəüöşığçƏÜÖŞİĞÇ\\s-]+$", message = "Soyad yalnız hərflər və tire (-) daxil edə bilər")
    private String surname;

    @NotBlank(message = "Doğum tarixi boş qala bilməz")
    @Pattern(regexp = "^\\d{2}\\.\\d{2}\\.\\d{4}$", message = "Tarixi gün.ay.il formatında yazın (məs: 05.09.2004)")
    private String birthDate;
}
