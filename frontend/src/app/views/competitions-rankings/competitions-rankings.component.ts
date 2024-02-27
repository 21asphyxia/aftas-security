import { RankingsService } from './../../services/rankings.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ButtonModule,
  CardBodyComponent,
  CardComponent,
  ColComponent,
  FormModule,
  ModalModule,
  TableModule,
} from '@coreui/angular';
import { Ranking } from '../../models/ranking.model';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Member } from '../../models/member.model';
import { Fish } from '../../models/fish.model';

@Component({
  selector: 'app-competitions-rankings',
  standalone: true,
  imports: [
    ColComponent,
    CardBodyComponent,
    CardComponent,
    ModalModule,
    TableModule,
    FormsModule,
    FormModule,
    ButtonModule,
  ],
  templateUrl: './competitions-rankings.component.html',
  styleUrl: './competitions-rankings.component.scss',
})
export class CompetitionsRankingsComponent implements OnInit{
  @ViewChild('closeModal') closeModal: any;
  @ViewChild('closeHuntModal') closeHuntModal: any;
  code: string = '';
  rankings: Ranking[] = [];
  members: Member[] = [];
  fishes: Fish[] = [];
  member_id: any;
  constructor(
    private rankingsService: RankingsService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.code = params.get('id') || '';
    });

    this.rankingsService.getMembers().subscribe((data) => {
      this.members = data;
    });

    this.rankingsService.getCompetitionMembers(this.code).subscribe((data) => {
      this.rankings = data.rankings;
    });

    this.rankingsService.getFish().subscribe((data) => {
      this.fishes = data;
    });
  }

  onSubmit(formValue: NgForm): void {
    let data = formValue.value;
    this.rankingsService
      .registerMember(this.code, data.member_number)
      .subscribe(
        (data) => {
          this.closeModal.nativeElement.click();
          this.rankings.push(data);
        },
        (error) => {
          if (error.error.message) {
            alert(error.error.message);
          } else {
            let errors = '';
            for (let key in error.error) {
              errors += error.error[key] + '\n';
            }
            alert(errors);
          }
        }
      );
  }
  onSubmitHunt(formValue: NgForm): void {
    let data = formValue.value;
    console.log(data);

    this.rankingsService
      .registerHunt(this.code, data.memberNum, data.fishId, data.weight)
      .subscribe(
        (data) => {
          this.closeHuntModal.nativeElement.click();
          this.rankingsService
            .getCompetitionMembers(this.code)
            .subscribe((data) => {
              this.rankings = data.rankings;
            });
        },
        (error) => {
          if (error.error.message) {
            alert(error.error.message);
          } else {
            let errors = '';
            for (let key in error.error) {
              errors += error.error[key] + '\n';
            }
            alert(errors);
          }
        }
      );
  }
  setHuntId(code: number | undefined) {
    this.member_id = code;
  }
}
