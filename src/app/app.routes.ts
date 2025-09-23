import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/attendance/attendance-module').then((m) => m.AttendanceModule),
  },
  {
    path: 'attendance-view',
    loadChildren: () => import('./modules/attendance-view/attendance-view-module').then((m) => m.AttendanceViewModule),
  },
];
