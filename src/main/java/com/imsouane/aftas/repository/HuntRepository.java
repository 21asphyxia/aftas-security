package com.imsouane.aftas.repository;

import com.imsouane.aftas.domain.entities.Hunt;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HuntRepository extends JpaRepository<Hunt, Long> {
}