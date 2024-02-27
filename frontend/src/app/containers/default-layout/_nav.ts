import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Competitions',
    url: '/competitions',
    iconComponent: { name: 'cil-speedometer' },
  },
    {
        name: 'Members',
        url: '/members',
        iconComponent: { name: 'cil-user' },
  },
];
