package com.imsouane.aftas.seeder;

import com.imsouane.aftas.domain.entities.Authority;
import com.imsouane.aftas.domain.entities.Role;
import com.imsouane.aftas.repository.AuthorityRepository;
import com.imsouane.aftas.repository.RoleRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Stream;

@RequiredArgsConstructor
public class RoleSeeder {

    private final RoleRepository roleRepository;
    private final AuthorityRepository authorityRepository;

    public void seedRoles() {
        List<Authority> authorities = authorityRepository.findAll();
        List<Authority> adherentAuthorities = authorities.stream()
                .filter(authority ->
                        authority.getName().equals("VIEW_COMPETITION") ||
                                authority.getName().equals("VIEW_PARTICIPATION") ||
                                authority.getName().equals("VIEW_PODIUM")
                ).toList();

        List<Authority> juryAuthorities = authorities.stream()
                .filter(authority ->
                        authority.getName().equals("CREATE_COMPETITION") ||
                                authority.getName().equals("DELETE_COMPETITION") ||
                                authority.getName().equals("CREATE_HUNT")
                ).toList();

        List<Role> roles = List.of(
                Role.builder()
                        .name("ROLE_ADHERENT")
                        .authorities(adherentAuthorities)
                        .isDefault(true)
                        .build(),
                Role.builder()
                        .name("ROLE_JURY")
                        .authorities(Stream.concat(adherentAuthorities.stream(), juryAuthorities.stream()).toList())
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
