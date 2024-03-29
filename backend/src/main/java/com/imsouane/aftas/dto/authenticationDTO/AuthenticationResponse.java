package com.imsouane.aftas.dto.authenticationDTO;

import com.imsouane.aftas.dto.memberDTO.MemberResponseDto;

public record AuthenticationResponse(
        String access_token,
        String refresh_token,
        MemberResponseDto member) {
}
