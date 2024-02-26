package com.imsouane.aftas.service;

import com.imsouane.aftas.domain.entities.Authority;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface AuthorityService {
    List<Authority> getAllByName(List<String> authorities);
}
