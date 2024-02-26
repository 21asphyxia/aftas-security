package com.imsouane.aftas.dto.authenticationDTO;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RefreshRequest {
    @NotBlank
    private String refreshToken;
}
