export class Competition {
  code?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  numberOfParticipants?: number;
  location?: string;

  constructor(
    code?: string,
    date?: string,
    startTime?: string,
    endTime?: string,
    numberOfParticipants?: number,
    location?: string
  ) {
    this.code = code;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.numberOfParticipants = numberOfParticipants;
    this.location = location;
  }
}
