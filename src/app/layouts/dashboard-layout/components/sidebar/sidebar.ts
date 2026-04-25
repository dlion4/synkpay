import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; 
// Exactly matching the folder and file name (without .ts)
import { SidebarService } from '../../../../services/sidebar/sidebar.service'; 

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class SidebarComponent {
  
  sidebarService = inject(SidebarService);

  get isCollapsed(): boolean {
    return this.sidebarService.isCollapsed();
  }

  toggleSidebar(): void {
    this.sidebarService.toggle();
  }
}