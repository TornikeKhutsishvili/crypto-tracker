import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  menuOpen = false;
  isNavMenuOpen = false;

  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  toggleNavMenu() {
    this.isNavMenuOpen = !this.isNavMenuOpen;
    const burgerIcon = document.querySelector('.burger-icon');
    if (this.isNavMenuOpen) {
      burgerIcon?.classList.add('active');  // Add active class to rotate burger icon
    } else {
      burgerIcon?.classList.remove('active');  // Remove active class to reset the icon
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}