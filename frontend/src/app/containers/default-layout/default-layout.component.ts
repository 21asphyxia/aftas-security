import { Component } from '@angular/core';
import { navItems } from './_nav';
import {
  ContainerComponent,
  SidebarModule,
} from '@coreui/angular';
import { NgScrollbar } from 'ngx-scrollbar';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DefaultHeaderComponent } from '../default-header/default-header.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    DefaultHeaderComponent,
    NgScrollbar,
    ContainerComponent,
    SidebarModule,
  ],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss',
  providers: [],
})
export class DefaultLayoutComponent {
  public navItems = navItems;

  public sidebarMinimized = false;
  private changes?: MutationObserver;
  public element: HTMLElement = document.body;
}
