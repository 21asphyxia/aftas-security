package com.imsouane.aftas.dto.authenticationDTO;

import com.imsouane.aftas.domain.entities.Member;
import com.imsouane.aftas.domain.enums.IdentityDocumentType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record RegisterRequest(
        @NotBlank(message = "Member email is mandatory")
        String email,
        @NotBlank(message = "Member password is mandatory")
        String password,
        @NotNull(message = "Member number is mandatory")
        Integer num,
        @NotBlank(message = "Member name is mandatory")
        String name,
        @NotBlank(message = "Member family name is mandatory")
        String familyName,
        @NotBlank(message = "Member nationality is mandatory")
        String nationality,
        @NotBlank(message = "Member identity document type is mandatory")
        String identityDocumentType,
        @NotBlank(message = "Member identity number is mandatory")
        String identityNumber
) {
    public Member toMember() {
        return Member.builder()
                .email(email)
                .password(password)
                .num(num)
                .name(name)
                .familyName(familyName)
                .nationality(nationality)
                .identityDocumentType(IdentityDocumentType.valueOf(identityDocumentType))
                .identityNumber(identityNumber)
                .build();

    }
}
