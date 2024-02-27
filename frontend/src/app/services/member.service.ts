import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../models/member.model';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  url = 'http://localhost:8081/api/v1/members';
  constructor(private http: HttpClient) {}

  getAllMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.url);
  }

  createMember(member: Member): Observable<Member> {
    return this.http.post<Member>(this.url, member);
  }

  searchMember(name: string): Observable<Member[]> {
    return this.http.get<Member[]>(this.url + '/search?query=' + name);
  }
}
