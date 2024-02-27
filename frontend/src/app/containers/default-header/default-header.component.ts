import { Component, Input } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';

import {
  BreadcrumbRouterComponent,
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

@Component({
  selector: 'app-default-header',
  standalone: true,
  imports: [
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

  constructor(private classToggler: ClassToggleService) {
    super();
  }
}
