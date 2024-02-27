export class Member {
  num?: number;
  full_name?: string;
  accession_date?: string;
  nationality?: string;
  identity_document_type?: string;
  identity_number?: string;

  constructor(
    num?: number,
    full_name?: string,
    accession_date?: string,
    nationality?: string,
    identity_document_type?: string,
    identity_number?: string
  ) {
    this.num = num;
    this.full_name = full_name;
    this.accession_date = accession_date;
    this.nationality = nationality;
    this.identity_document_type = identity_document_type;
    this.identity_number = identity_number;
  }
}
