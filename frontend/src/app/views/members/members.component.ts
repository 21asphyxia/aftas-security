import { MemberService } from './../../services/member.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {
  ButtonModule,
  CardBodyComponent,
  CardComponent,
  ColComponent,
  FormFloatingDirective,
  FormModule,
  ModalModule,
  TableModule,
  UtilitiesModule,
} from '@coreui/angular';
import { Member } from '../../models/member.model';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [
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
  ],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss',
})
export class MembersComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef | undefined;
  members: Member[] = [];
  constructor(private memberService: MemberService) {}

  ngOnInit(): void {
    this.memberService.getAllMembers().subscribe((members) => {
      this.members = members;
    });
  }
  onSubmit(form: NgForm) {
    let data = form.value;
    this.memberService.createMember(data).subscribe(
      (member) => {
        this.members.unshift(member);
        this.closeModal?.nativeElement.click();
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

  onSearchChange(searchValue: string): void {
    if (searchValue.length > 0) {
      this.memberService.searchMember(searchValue).subscribe((members) => {
        this.members = members;
      });
    } else {
      this.memberService.getAllMembers().subscribe((members) => {
        this.members = members;
      });
    }
  }

  approve(number: number) {
    this.memberService.approveMember(number).subscribe((member) => {
      this.members = this.members.map((m) => {
        if (m.num === member.num) {
          return member;
        }
        return m;
      });
    });
  }
}
