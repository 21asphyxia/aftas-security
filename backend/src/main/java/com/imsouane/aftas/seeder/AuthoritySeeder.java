package com.imsouane.aftas.seeder;

import com.imsouane.aftas.domain.entities.Authority;
import com.imsouane.aftas.repository.AuthorityRepository;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
public class AuthoritySeeder {

    private final AuthorityRepository authorityRepository;

    public void seedAuthorities() {
        List<Authority> authorities = new ArrayList<>();
        List<String> authorityNames = List.of(
                "APPROVE_ACCOUNT",
                "DELETE_ACCOUNT",
                "CREATE_COMPETITION",
                "DELETE_COMPETITION"
        );

        authorityNames.forEach(name -> {
            authorities.add(Authority.builder()
                    .name(name)
                    .build());
        });

        authorityRepository.saveAll(authorities);
    }
}
