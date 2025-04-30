import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  successMessage: string | null = null;
  error: string | null = null;
  isUpperCase: boolean = false;

  passwordPattern = '(?=.*[A-Z])(?=.*\\d)';
  emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';

  constructor(private auth: AuthService, private router: Router) {}

  checkUpperCase() {
    this.isUpperCase = /[A-Z]/.test(this.password);
  }

  register(): void {
    this.successMessage = null;
    this.error = null;

    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match!';
      return;
    }

    if (!this.email.match(this.emailPattern)) {
      this.error = 'Please enter a valid email address.';
      return;
    }

    if (!this.password.match(this.passwordPattern)) {
      this.error = 'Password must contain at least one uppercase letter and one digit.';
      return;
    }

    const success = this.auth.register({
      name: this.name,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    });

    if (success) {
      this.successMessage = 'Registration successful! Redirecting to login...';
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);
    } else {
      this.error = 'User already exists!';
    }
  }

  isFormValid(): boolean {
    return (
      !!this.name &&
      !!this.email &&
      this.password.length >= 6 &&
      this.password === this.confirmPassword &&
      !!this.email.match(this.emailPattern) &&
      !!this.password.match(this.passwordPattern) &&
      this.isUpperCase
    );
  }
}
