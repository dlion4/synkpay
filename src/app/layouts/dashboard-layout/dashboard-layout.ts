import { Component, OnInit, Renderer2, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar';
import { HeaderComponent } from './components/header/header';
import { FooterComponent } from './components/footer/footer';
// Exactly matching the folder and file name (without .ts)
import { SidebarService } from '../../services/sidebar/sidebar.service'; 

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, FooterComponent],
  templateUrl: './dashboard-layout.html',
  styleUrls: ['./dashboard-layout.scss']
})
export class DashboardLayoutComponent implements OnInit {
  sidebarService = inject(SidebarService);

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.initializeTheme();
  }

  initializeTheme(): void {
    const defaultThemeMode = 'light';
    let themeMode = localStorage.getItem('data-bs-theme') || defaultThemeMode;

    if (themeMode === 'system') {
      themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    this.renderer.setAttribute(document.documentElement, 'data-bs-theme', themeMode);
  }
}


