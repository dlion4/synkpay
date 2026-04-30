import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; 
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