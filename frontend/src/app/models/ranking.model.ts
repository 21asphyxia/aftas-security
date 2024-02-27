export class Ranking {
  member_number?: number;
  member_fullName?: string;
  rank?: number;
  score?: number;

  constructor(
    member_number?: number,
    member_fullName?: string,
    rank?: number,
    score?: number
  ) {
    this.member_number = member_number;
    this.member_fullName = member_fullName;
    this.rank = rank;
    this.score = score;
  }
}
