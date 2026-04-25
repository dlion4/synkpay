import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar';
import { HeaderComponent } from './components/header/header';
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, FooterComponent],
  templateUrl: './dashboard-layout.html'
})
export class DashboardLayoutComponent implements OnInit {
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

import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  // Using Angular 17 Signals for easy reactivity
  isCollapsed = signal<boolean>(false);

  toggle() {
    this.isCollapsed.update(val => !val);
  }
}