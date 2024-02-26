package com.imsouane.aftas.seeder;

import com.imsouane.aftas.domain.entities.Authority;
import com.imsouane.aftas.domain.entities.Role;
import com.imsouane.aftas.repository.AuthorityRepository;
import com.imsouane.aftas.repository.RoleRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class RoleSeeder {

    private final RoleRepository roleRepository;
    private final AuthorityRepository authorityRepository;

    public void seedRoles() {
        List<Authority> authorities = authorityRepository.findAll();

        List<Role> roles = List.of(
                Role.builder()
                        .name("ROLE_ADHERENT")
                        .isDefault(true)
                        .build(),
                Role.builder()
                        .name("ROLE_JURY")
                        .authorities(authorities.stream()
                                .filter(authority ->
                                        authority.getName().equals("CREATE_COMPETITION") ||
                                                authority.getName().equals("DELETE_COMPETITION")
                                ).toList())
                        .isDefault(false)
                        .build(),

                Role.builder()
                        .name("ROLE_MANAGER")
                        .authorities(authorities)
                        .isDefault(false)
                        .build()
        );

        roleRepository.saveAll(roles);
    }
}
