package com.imsouane.aftas.seeder;

import com.imsouane.aftas.repository.AuthorityRepository;
import com.imsouane.aftas.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MainSeeder implements CommandLineRunner {

    private final AuthorityRepository authorityRepository;
    private final RoleRepository roleRepository;


    @Override
    public void run(String... args) {
        if (authorityRepository.count() == 0) {
            new AuthoritySeeder(authorityRepository).seedAuthorities();
        }

        if (roleRepository.count() == 0) {
            new RoleSeeder(roleRepository, authorityRepository).seedRoles();
        }
    }
}
