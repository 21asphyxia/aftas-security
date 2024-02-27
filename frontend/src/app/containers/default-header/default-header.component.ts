import { Component, Input } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';

import {
  BreadcrumbRouterComponent,
  ButtonDirective,
  ClassToggleService,
  ContainerComponent,
  HeaderComponent,
  HeaderDividerComponent,
  HeaderModule,
  HeaderNavComponent,
  HeaderTogglerDirective,
  NavItemComponent,
  SidebarModule,
  SidebarToggleDirective,
  SidebarTogglerComponent,
} from '@coreui/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default-header',
  standalone: true,
  imports: [
    ButtonDirective,
    ContainerComponent,
    HeaderNavComponent,
    NavItemComponent,
    HeaderDividerComponent,
    BreadcrumbRouterComponent,
    SidebarModule,
    IconDirective,
    HeaderModule,
  ],
  providers: [],
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {
  @Input() sidebarId: string = 'sidebar';

  constructor(private classToggler: ClassToggleService, private authService: AuthService, private router: Router) {
    super();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
