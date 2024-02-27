import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule, CardBodyComponent, CardComponent, ColComponent, FormFloatingDirective, FormModule, ModalModule, TableModule, UtilitiesModule } from '@coreui/angular';
import { CompetitionService } from '../../services/competition.service';
import { Competition } from '../../models/competition.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-participations',
  standalone: true,
  imports: [
    CommonModule,
    ColComponent,
    CardComponent,
    CardBodyComponent,
    TableModule,
    UtilitiesModule,
    ModalModule,
    ButtonModule,
    FormModule,
    FormsModule,
    FormFloatingDirective,
    RouterLink
  ],
  templateUrl: './participations.component.html',
  styleUrl: './participations.component.scss',
})
export class ParticipationsComponent {
  competitions: Competition[] = [];

  constructor(private competitionService: CompetitionService) {}

  ngOnInit(): void {
    this.competitionService.getAllMemberCompetitions().subscribe((competitions) => {
      this.competitions = competitions;
    });
  }
}
