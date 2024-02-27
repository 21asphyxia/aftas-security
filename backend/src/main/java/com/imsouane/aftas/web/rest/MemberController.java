package com.imsouane.aftas.web.rest;

import com.imsouane.aftas.dto.memberDTO.MemberResponseDto;
import com.imsouane.aftas.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/members")
public class MemberController {
    private final MemberService memberService;

    @GetMapping
    public ResponseEntity<Iterable<MemberResponseDto>> findAll() {
        return ResponseEntity.ok(MemberResponseDto.fromMembers(memberService.findAll()));
    }

    @GetMapping("/search")
    public ResponseEntity<List<MemberResponseDto>> search(@RequestParam String query) {
        return ResponseEntity.ok(MemberResponseDto.fromMembers(memberService.search(query)));
    }

    @PreAuthorize("hasAuthority('APPROVE_ACCOUNT')")
    @PutMapping("/{num}")
    public ResponseEntity<MemberResponseDto> approve(@PathVariable String num) {
        return ResponseEntity.ok(MemberResponseDto.fromMember(memberService.approve(num)));
    }
}
