import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ranking } from '../models/ranking.model';
import { Member } from '../models/member.model';
import { Fish } from '../models/fish.model';

@Injectable({
  providedIn: 'root',
})
export class RankingsService {
  url: string = 'http://localhost:8081/api/v1/rankings';
  memberUrl: string = 'http://localhost:8081/api/v1/members';
  fishUrl: string = 'http://localhost:8081/api/v1/fishes';
  huntUrl: string = 'http://localhost:8081/api/v1/hunts';

  constructor(private http: HttpClient) {}
  getPodium(code: string) {
    return this.http.get<any>(this.url + '/competitions/' + code + '/podium');
  }

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.memberUrl);
  }
  getFish(): Observable<Fish[]> {
    return this.http.get<Fish[]>(this.fishUrl);
  }

  getCompetitionMembers(code: string): Observable<any> {
    return this.http.get<Ranking[]>(this.url + '/competitions/' + code);
  }

  registerMember(code: string, num: number): Observable<Ranking> {
    return this.http.post(this.url, {
      competitionCode: code,
      memberNum: num,
    });
  }
  registerHunt(
    code: string,
    member_number: any,
    fish_id: any,
    weight: any
  ): Observable<any> {
    console.log(code, member_number, fish_id, weight);

    return this.http.post(this.huntUrl, {
      competition_code: code,
      memberNum: member_number,
      fishId: fish_id,
      weight: weight,
    });
  }
}
