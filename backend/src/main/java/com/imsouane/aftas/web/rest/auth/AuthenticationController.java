package com.imsouane.aftas.web.rest.auth;

import com.imsouane.aftas.domain.entities.Member;
import com.imsouane.aftas.dto.authenticationDTO.AuthenticationRequest;
import com.imsouane.aftas.dto.authenticationDTO.AuthenticationResponse;
import com.imsouane.aftas.dto.authenticationDTO.RefreshRequest;
import com.imsouane.aftas.dto.authenticationDTO.RegisterRequest;
import com.imsouane.aftas.dto.memberDTO.MemberResponseDto;
import com.imsouane.aftas.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody @Valid AuthenticationRequest request) {
        AuthenticationResponse authenticate = authenticationService.authenticate(request);
        return ResponseEntity.ok(authenticate);
    }

    @PostMapping("/register")
    public ResponseEntity<MemberResponseDto> register(@RequestBody @Valid RegisterRequest request) {
        Member member = authenticationService.register(request.toMember());
        return ResponseEntity.ok(MemberResponseDto.fromMember(member));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthenticationResponse> refreshToken(@RequestBody @Valid RefreshRequest refreshToken) {
        return ResponseEntity.ok(authenticationService.generateRefreshToken(refreshToken.getRefreshToken()));
    }
}

