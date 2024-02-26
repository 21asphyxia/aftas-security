package com.imsouane.aftas.service;

import com.imsouane.aftas.domain.entities.Member;
import org.springframework.stereotype.Component;

@Component
public interface AuthenticationService {

    Member register(Member member);

    AuthenticationResponse authenticate(AuthenticationRequest user);

    AuthenticationResponse generateRefreshToken(String refreshToken);
}
