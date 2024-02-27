import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Competition } from '../models/competition.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompetitionService {
  url = 'http://localhost:8081/api/v1/competitions';

  constructor(private http: HttpClient) {}

  getCompetitionsCount() {
    return this.http.get<number>(this.url + '/count');
  }
  getAllCompetitions(page: number, size: number): Observable<Competition[]> {
    return this.http.get<Competition[]>(
      this.url + '?page=' + page + '&size=' + size
    );
  }

  createCompetition(competition: Competition): Observable<Competition> {
    return this.http.post<Competition>(this.url, competition);
  }

  getAllMemberCompetitions(): Observable<Competition[]> {
    return this.http.get<Competition[]>(
      'http://localhost:8081/api/v1/rankings/participations'
    );
  }
}
