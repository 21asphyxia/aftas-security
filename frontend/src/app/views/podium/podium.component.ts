import { Component, OnInit } from '@angular/core';
import {
  CardBodyComponent,
  CardComponent,
  ColComponent,
  TableModule,
} from '@coreui/angular';
import { Ranking } from '../../models/ranking.model';
import { ActivatedRoute } from '@angular/router';
import { RankingsService } from '../../services/rankings.service';

@Component({
  selector: 'app-podium',
  standalone: true,
  imports: [ColComponent, CardBodyComponent, CardComponent, TableModule],
  templateUrl: './podium.component.html',
  styleUrl: './podium.component.scss',
})
export class PodiumComponent implements OnInit {
  code: string = '';
  rankings: Ranking[] = [];
  constructor(
    private rankingsService: RankingsService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.code = params.get('id') || '';
    });
    this.rankingsService.getPodium(this.code).subscribe((data) => {
      this.rankings = data.rankings;
    });
  }
}
