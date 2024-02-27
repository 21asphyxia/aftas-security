import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ButtonDirective,
  FormCheckComponent,
  FormControlDirective,
  FormLabelDirective,
  FormTextDirective,
} from '@coreui/angular';
import { AuthService } from '../../services/auth.service';
import { Member } from '../../models/member.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormCheckComponent,
    FormControlDirective,
    FormTextDirective,
    FormLabelDirective,
    ButtonDirective,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null,
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe({
      next: (data: any) => {
        localStorage.setItem('member', JSON.stringify(data.member));
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('refreshToken', data.refresh_token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
