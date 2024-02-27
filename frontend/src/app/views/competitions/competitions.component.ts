import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  ButtonModule,
  CardBodyComponent,
  CardComponent,
  ColComponent,
  FormModule,
  ModalModule,
  PageItemComponent,
  PaginationModule,
  TableModule,
  UtilitiesModule,
} from '@coreui/angular';
import { Competition } from '../../models/competition.model';
import { CompetitionService } from '../../services/competition.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { PaginationComponent } from '../../partials/pagination/pagination.component';

@Component({
  selector: 'app-competitions',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
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
    PaginationComponent,
  ],
  templateUrl: './competitions.component.html',
  styleUrl: './competitions.component.scss',
})
export class CompetitionsComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef | undefined;
  competitionForm: any;
  competitions: Competition[] = [];
  count_competitions = -1;
  page = 0;
  size = 5;

  constructor(
    private competitionService: CompetitionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.page = +params['page'] || 0;
      this.size = +params['size'] || 5;
    });
    this.getCompetitions(this.page);
    this.getCompetitionsCount();
  }

  getCompetitions(page: number = 0) {
    this.page = page;
    this.competitionService
      .getAllCompetitions(page, this.size)
      .subscribe((competitions) => {
        this.competitions = competitions;
      });
  }

  getCompetitionsCount() {
    this.competitionService
      .getCompetitionsCount()
      .subscribe((count_competitions) => {
        this.count_competitions = count_competitions;
      });
  }

  onSubmit(formValue: NgForm): void {
    let data = formValue.value;
    const competition: Competition = {
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      numberOfParticipants: data.numberOfParticipants,
      location: data.location,
    };
    this.competitionService.createCompetition(competition).subscribe(
      (competition) => {
        this.competitions.unshift(competition);
        this.closeModal?.nativeElement.click();
        formValue.resetForm();
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
}
