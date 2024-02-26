package com.imsouane.aftas.repository;

import com.imsouane.aftas.domain.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByDefaultIsTrue();
    Optional<Role> findByName(String name);
}
