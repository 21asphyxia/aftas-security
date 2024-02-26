package com.imsouane.aftas.service.impl;

import com.imsouane.aftas.domain.entities.Authority;
import com.imsouane.aftas.domain.entities.Role;
import com.imsouane.aftas.exception.ErrorException;
import com.imsouane.aftas.repository.RoleRepository;
import com.imsouane.aftas.service.AuthorityService;
import com.imsouane.aftas.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final AuthorityService authorityService;
    private final RoleRepository roleRepository;

    @Override
    public List<Role> getAll() {
        return roleRepository.findAll();
    }

    @Override
    public Role save(Role role) {
        List<String> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
        if (authorities.contains("CREATE_ROLE")) {
            if (findDefaultRole().isPresent() && role.isDefault())
                throw new ErrorException("There is already a default role");
            role.setAuthorities(authorityService.getAllByName(role.getAuthorities().stream().map(Authority::getName).toList()));
            return roleRepository.save(role);
        } else return null;
    }

    @Override
    public Optional<Role> findDefaultRole() {
        return roleRepository.findByisDefaultIsTrue();
    }

    @Override
    public Role grantAuthorities(List<Authority> authoritiesToGrant, Long id) {
        List<String> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
        if (authorities.contains("GRANT_AUTHORITY_TO_ROLE")) {
            Role role = roleRepository.findById(id).orElse(null);
            if (role != null) {
                Set<Authority> newAuthorities = new HashSet<>(role.getAuthorities());
                newAuthorities.addAll(authorityService.getAllByName(authoritiesToGrant.stream().map(Authority::getName).toList()));
                List<Authority> authorityList = new ArrayList<>(newAuthorities);
                role.setAuthorities(authorityList);
                return roleRepository.save(role);
            }
            return null;
        }
        return null;
    }

    @Override
    public Role revokeAuthorities(List<Authority> authoritiesToRevoke, Long id) {
        List<String> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
        if (authorities.contains("REVOKE_AUTHORITY_FROM_ROLE")) {
            Role role = roleRepository.findById(id).orElse(null);
            if (role != null) {
                List<Authority> currentAuthorities = role.getAuthorities();
                currentAuthorities.removeAll(authorityService.getAllByName(authoritiesToRevoke.stream().map(Authority::getName).toList()));
                role.setAuthorities(currentAuthorities);
                return roleRepository.save(role);
            }
            return null;
        }
        return null;
    }

    @Override
    public Role update(Role role, Long id) {
//        List<String> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
//        if (authorities.contains("UPDATE_ROLE")) {
        Role existingRole = getById(id).orElse(null);
        if (existingRole != null) {
            existingRole.setName(role.getName());
            existingRole.setAuthorities(role.getAuthorities());
            if (role.isDefault() && findDefaultRole().isPresent())
                throw new ErrorException("There is already a default role");
            existingRole.setDefault(role.isDefault());
            return roleRepository.save(existingRole);
        }
        return null;
    }

    @Override
    public Optional<Role> getById(Long id) {
        return roleRepository.findById(id);
    }

    @Override
    public Optional<Role> getByName(String name) {
        return roleRepository.findByName(name);
    }

    @Override
    public void delete(Long id) {
        List<String> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
        if (authorities.contains("DELETE_ROLE")) getById(id).ifPresent(roleRepository::delete);
    }

}
