package com.imsouane.aftas.service.impl;

import com.imsouane.aftas.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final RoleService roleService;
    private final JwtUtils jwtUtils;
    private final RefreshTokenService refreshTokenService;

    @Override
    public Member register(Member member) {
        member.setPassword(passwordEncoder.encode(member.getPassword()));
        member.setRole(roleService.findDefaultRole().orElse(null));

        return memberRepository.save(member);
    }

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        Member user = (Member) authentication.getPrincipal();

        String accessToken = jwtUtils.generateTokenFromUsername(user.getEmail());
        String refreshToken = refreshTokenService.createRefreshToken(user.getId()).getToken();

        return new AuthenticationResponse(
                accessToken,
                refreshToken,
                MemberResponse.fromMember(user)
        );
    }

    @Override
    public AuthenticationResponse generateRefreshToken(String refreshToken) {
        RefreshToken foundRefreshToken = refreshTokenService.findByToken(refreshToken)
                .orElseThrow(() -> new TokenRefreshException(refreshToken, "Refresh token is not in database!"));
        Member user = foundRefreshToken.getUser();
        String accessToken = jwtUtils.generateTokenFromUsername(user.getEmail());

        RefreshToken newRefreshToken = refreshTokenService.createRefreshToken(user.getId());

        return new AuthenticationResponse(accessToken, newRefreshToken.getToken(), MemberResponse.fromMember(user));
    }
}
