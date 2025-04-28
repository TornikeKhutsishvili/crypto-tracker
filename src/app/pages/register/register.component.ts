import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  error: string | null = null;
  showPassword: boolean = false;
  isUpperCase: boolean = false;

  // Regular expression to ensure the password contains at least one uppercase letter
  passwordPattern: string = '(?=.*[A-Z])(?=.*\d)';

  // Regular expression for email validation
  emailPattern: string = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  checkUpperCase() {
    if (this.password && this.password[0] === this.password[0].toUpperCase()) {
      this.isUpperCase = true;
    } else {
      this.isUpperCase = false;
    }
  }

  register(): void {
    // Password validation
    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match!'; // Only string
      return;
    }

    // Email validation
    if (!this.email.match(this.emailPattern)) {
      this.error = 'Please enter a valid email address.';
      return;
    }

    // Password validation for uppercase letter
    if (!this.password.match(this.passwordPattern)) {
      this.error = 'Password must contain at least one uppercase letter.';
      return;
    }

    // Registration process
    const success = this.auth.register({
      name: this.name,
      email: this.email,
      password: this.password,
    });

    if (success) {
      this.router.navigate(['/login']);
    } else {
      this.error = 'User already exists!'; // Only string
    }
  }

  // Form validation
  isFormValid(): string | boolean {
    return (
      this.name &&
      this.email &&
      this.password.length >= 6 &&
      this.password === this.confirmPassword &&
      !!this.email.match(this.emailPattern) &&
      !!this.password.match(this.passwordPattern) &&
      this.isUpperCase
    );
  }
}
