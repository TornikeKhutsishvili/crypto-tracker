import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavigationComponent } from "./pages/navigation/navigation.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    RouterOutlet,
    NavigationComponent,
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'crypto-tracker';

  constructor(@Inject(PLATFORM_ID) private platformId: Object){}

  ngOnInit(): void {
    this.clearLocalStorageIfNeeded();
  }

  clearLocalStorageIfNeeded(): void {
    if (isPlatformBrowser(this.platformId)) {
      const LAST_CLEAN_KEY = 'lastLocalStorageClean';
      const now = new Date().getTime();
      const FIVE_DAYS = 1000 * 60 * 60 * 24 * 2;

      const lastCleanStr = localStorage.getItem(LAST_CLEAN_KEY);
      const lastClean = lastCleanStr ? parseInt(lastCleanStr, 10) : 0;

      if (!lastClean || now - lastClean > FIVE_DAYS) {
        localStorage.clear();
        localStorage.setItem(LAST_CLEAN_KEY, now.toString());
        console.log('LocalStorage cleared due to 5-day interval.');
      }
    }
  }
}
