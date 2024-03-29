package com.imsouane.aftas.web.rest;

import com.imsouane.aftas.dto.competitionDTO.CompetitionRankingsResponseDto;
import com.imsouane.aftas.dto.competitionDTO.CompetitionResponseDto;
import com.imsouane.aftas.dto.rankingDTO.RankingResponseDto;
import com.imsouane.aftas.dto.rankingDTO.RegistrationRequestDto;
import com.imsouane.aftas.service.RankingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/rankings")
@RequiredArgsConstructor
public class RankingController {
    private final RankingService rankingService;

    @PostMapping
    public ResponseEntity<RankingResponseDto> registerMember(@RequestBody @Valid RegistrationRequestDto registrationRequestDto) {
        return ResponseEntity.ok(RankingResponseDto.fromRanking(rankingService.registerMember(RegistrationRequestDto.toRanking(registrationRequestDto))));
    }


    @GetMapping("/competitions/{code}")
    public ResponseEntity<CompetitionRankingsResponseDto> findByCompetitionCode(@PathVariable String code) {
        return ResponseEntity.ok(CompetitionRankingsResponseDto.fromCompetitionAndRankings(code, RankingResponseDto.fromRankings(rankingService.findByCompetition(code))));
    }

    @PreAuthorize("hasAuthority('VIEW_PODIUM')")
    @GetMapping("/competitions/{code}/podium")
    public ResponseEntity<CompetitionRankingsResponseDto> findPodiumByCompetitionCode(@PathVariable String code) {
        return ResponseEntity.ok(CompetitionRankingsResponseDto.fromCompetitionAndRankings(code, RankingResponseDto.fromRankings(rankingService.findPodiumByCompetitionCode(code))));
    }

    @PreAuthorize("hasAuthority('VIEW_PARTICIPATION')")
    @GetMapping("/participations")
    public ResponseEntity<Iterable<CompetitionResponseDto>> findMemberParticipations() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(CompetitionResponseDto.fromCompetitions(rankingService.findMemberParticipations(userDetails.getUsername())));
    }


}
