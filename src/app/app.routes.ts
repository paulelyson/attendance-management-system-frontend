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
  {
    path: 'attendance-user-detail',
    loadChildren: () => import('./modules/attendance-user-detail/attendance-user-detail.module').then((m) => m.AttendanceUserDetailModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule),
  },
];
