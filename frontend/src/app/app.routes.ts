import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './containers/default-layout/default-layout.component';
import { CompetitionsComponent } from './views/competitions/competitions.component';
import { CompetitionsRankingsComponent } from './views/competitions-rankings/competitions-rankings.component';
import { MembersComponent } from './views/members/members.component';
import { PodiumComponent } from './views/podium/podium.component';
import { LoginComponent } from './views/login/login.component';
import { authGuard } from './guards/auth.guard';
import { ParticipationsComponent } from './views/participations/participations.component';
import { juryGuard } from './guards/jury.guard';
import { managerGuard } from './guards/manager.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'competitions',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [authGuard],
    data: {
      title: 'Home',
    },
    children: [
      {
        path: 'members',
        component: MembersComponent,
        canActivate: [managerGuard],
      },
      {
        path: 'competitions',
        component: CompetitionsComponent,
        canActivate: [juryGuard],
      },
      {
        path: 'competitions/:id',
        component: CompetitionsRankingsComponent,
        canActivate: [juryGuard],
      },
      {
        path: 'podium/:id',
        component: PodiumComponent,
      },
      {
        path: 'participations',
        component: ParticipationsComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
